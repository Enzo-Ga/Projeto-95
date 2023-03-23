import React, { Component } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  FlatList,
} from "react-native";
import * as Font from "expo-font";
import CuriosityCard from "./curiosityCard";
import firebase from "firebase";

let customFonts = {
  "Arcane-Nine": require("../assets/Arcane-Nine.ttf"),
};
export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      hints: [],
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchHints();
  }

  fetchHints = () => {
    firebase
      .database()
      .ref("/posts/")
      .on(
        "value",
        (snapshot) => {
          let hints = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              hints.push({
                key: key,
                value: snapshot.val()[key],
              });
            });
          }
          this.setState({ hints: hints });
          this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log("A leitura falhou: " + errorObject.code);
        }
      );
  };

  renderItem = ({ item: hint }) => {
    return <CuriosityCard hint={hint} navigation={this.props.navigation} />;
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    if (!this.state.fontsLoaded) {
      return <Text>Carregando...</Text>;
    } else {
      return (
        <View style={styles.background}>
          <View style={styles.title}>
            <Image
              resizeMode="contain"
              style={styles.icon}
              source={require("../assets/lol_logo.png")}
            />
            <Text style={styles.titleText}>For Beginners</Text>
          </View>
          <ImageBackground
            source={require("../assets/sr.jpg")}
            style={styles.background}
          >
            <View style={styles.container}>
              {!this.state.hints[0] ? (
                <View></View>
              ) : (
                <FlatList
                  data={this.state.hints}
                  keyExtractor={this.keyExtractor}
                  renderItem={this.renderItem}
                />
              )}
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  title: {
    flex: 0.12,
    backgroundColor: "black",
    flexDirection: "row",
  },
  icon: {
    flex: 0.6,
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
  },
  titleText: {
    color: "#fae189",
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
    flexDirection: "row",
    fontSize: 45,
    fontFamily: "Arcane-Nine",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 15,
    marginTop: 15,
    borderRadius: 20,
    borderColor: "#fae189",
    borderWidth: 1,
  },
});
