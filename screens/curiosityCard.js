import React, { Component } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import * as Font from "expo-font";
import firebase from "firebase";
import { StatusBar } from "expo-status-bar";

let customFonts = {
  "Arcane-Nine": require("../assets/Arcane-Nine.ttf"),
};

export default class CuriosityCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      hint_id: this.props.hint.key,
      hint_data: this.props.hint.value,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }
  render() {
    let hint = this.state.hint_data;
    if (!this.state.fontsLoaded) {
      <Text>Carregando...</Text>;
    } else {
      let tags = {
        Curiosidades: "#f9220e",
        Campeões: "#043c67",
        Lore: "#fdff2f",
        Outros: "#636363",
      };
      let name;
      if (tags[hint.tag] === "#fdff2f") {
        name = "Lore";
      } else if (tags[hint.tag] === "#f9220e") {
        name = "Curiosidades";
      } else if (tags[hint.tag] === "#043c67") {
        name = "Campeões";
      } else {
        name = "Outros";
      }
      return (
        <TouchableOpacity
          style={styles.container}
          //     onPress={() => {
          //       this.props.navigation.navigate("hintScreen", { hint: hint });
          //    }}
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View>
            <View
              style={[
                styles.tagContainer,
                { marginBottom: this.state.open ? 200 : 50 },
              ]}
            >
              <View
                style={[styles.tagCircle, { backgroundColor: tags[hint.tag] }]}
              />
              <Text>{name}</Text>
            </View>
            <Text style={styles.textTitle}>{hint.title}</Text>
            <Text style={styles.textHint}>{hint.description}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#fae189",
    backgroundColor: "rgba(180,180,180,0.5)",
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  textTitle: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Arcane-Nine",
  },
  textHint: {
    fontFamily: "Arcane-Nine",
    padding: 5,
  },
  tagContainer: {
    flex: 0.1,
    margin: 20,
    flexDirection: "row",
  },
  tagCircle: {
    backgroundColor: "red",
    width: 40,
    height: 40,
    alignSelf: "center",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#d29848",
    marginTop: 30,
    marginLeft: 4,
  },
});
