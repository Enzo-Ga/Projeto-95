import React, { Component } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as Font from "expo-font";
import DropDownPicker from "react-native-dropdown-picker";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

let customFonts = {
  "Arcane-Nine": require("../assets/Arcane-Nine.ttf"),
};
export default class CreateCuriosity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      tag: "Curiosidades",
      open: false,
    };
  }

  async addHint() {
    if (this.state.title && this.state.description) {
      let hintData = {
        tag: this.state.tag,
        title: this.state.title,
        description: this.state.description,
        // author: firebase.auth().currentUser.displayName,
        // created_on: new Date(),
        // author_uid: firebase.auth().currentUser.uid,
        likes: 0,
        dislikes: 0,
      };
      await firebase
        .database()
        .ref("/posts/" + Math.random().toString(36).slice(2))
        .set(hintData)
        .then(function (snapshot) {});
      this.props.setUpdateToTrue();
      this.props.navigation.navigate("Home");
    } else {
      Alert.alert(
        "Error",
        "Todos os campos são obrigatórios!",
        [{ text: "OK", onPress: () => console.log("OK Pressionado") }],
        { cancelable: false }
      );
    }
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <Text>Carregando...</Text>;
    } else {
      let tags = {
        Curiosidades: "#f9220e",
        Campeões: "#043c67",
        Lore: "#fdff2f",
        Outros: "#636363",
      };
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
            <ScrollView>
              <View style={styles.container}>
                <View
                  style={[
                    styles.tagContainer,
                    { marginBottom: this.state.open ? 200 : 50 },
                  ]}
                >
                  <View
                    style={[
                      styles.tagCircle,
                      { backgroundColor: tags[this.state.tag] },
                    ]}
                  />
                  <View>
                    <DropDownPicker
                      items={[
                        { label: "Curiosidades", value: "Curiosidades" },
                        { label: "Campeões", value: "Campeões" },
                        { label: "Lore", value: "Lore" },
                        { label: "Outros", value: "Outros" },
                      ]}
                      defaultValue={this.state.tag}
                      style={{
                        minHeight: 10,
                        alignSelf: "center",
                        marginTop: 4,
                        backgroundColor: "rgba(180,180,180,0.5)",
                        borderColor: "#d29848",
                        padding: 10,
                      }}
                      labelProps={{
                        numberOfLines: 4,
                      }}
                      containerStyle={{
                        width: 300,
                        marginLeft: 5,
                      }}
                      listItemContainer={{
                        height: 100,
                      }}
                      onOpen={() => {
                        this.setState({ open: true });
                      }}
                      open={this.state.open}
                      onClose={() => {
                        this.setState({ open: false });
                      }}
                      onSelectItem={(item) => {
                        this.setState({ tag: item.value });
                      }}
                      textStyle={{
                        fontFamily: "Arcane-Nine",
                        padding: 5,
                      }}
                      dropDownDirection={"AUTO"}
                      placeholder={this.state.tag}
                    />
                  </View>
                </View>
                <View style={styles.containerInputs}>
                  <TextInput
                    placeholder={"Escreva o título da sua dica..."}
                    onChangeText={(title) => this.setState({ title })}
                    style={styles.inputFont}
                    numberOfLines={2}
                    multiline={true}
                  />
                  <TextInput
                    placeholder={"Escreva a dica aqui..."}
                    onChangeText={(description) =>
                      this.setState({ description })
                    }
                    multiline={true}
                    numberOfLines={15}
                    style={styles.inputFont}
                  />
                </View>
                <View style={styles.containerSubmitButton}>
                  <TouchableOpacity
                    onPress={() => this.addHint()}
                    style={styles.submitButton}
                  >
                    <Text style={styles.textButton}>SUBMIT</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
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
  inputFont: {
    borderWidth: 1,
    borderColor: "#d29848",
    backgroundColor: "rgba(180,180,180,0.5)",
    borderRadius: 2,
    marginBottom: 10,
    width: 350,
    minHeight: 30,
    alignSelf: "center",
    fontFamily: "Arcane-Nine",
    fontSize: 15,
    paddingLeft: 5,
    paddingTop: 5,
  },
  containerSubmitButton: {
    alignSelf: "center",
    alignItems: "center",
  },
  submitButton: {
    width: 100,
    height: 35,
    backgroundColor: "#043c67",
    borderWidth: 2,
    borderColor: "#d29848",
    justifyContent: "center",
  },
  textButton: {
    textAlign: "center",
    fontFamily: "Arcane-Nine",
    fontSize: 20,
    color: "#fae189",
  },
});
