import { TextInput, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

const create = () => {
  const [title, onChangeTitle] = React.useState("");
  const [textDesc, onChangeTextDesc] = React.useState("");
  const [loaded, error] = useFonts({
    "Exo-Regular": require("../assets/fonts/Exo-Regular.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.textInputTitle, { fontFamily: "Exo-Regular" }]}
        onChangeText={onChangeTitle}
        value={title}
        placeholder="Title"
      />
      <TextInput
        style={[styles.textInputDesc, { fontFamily: "Exo-Regular" }]}
        onChangeText={onChangeTextDesc}
        value={textDesc}
        multiline={true}
        placeholder="Write ur Notes"
        selectTextOnFocus={true}
      />
      <Entypo
        name="save"
        size={50}
        color="grey"
        style={styles.iconSave}
        onPress={() => alert("Coming Soon :)")}
      />
    </View>
  );
};

export default create;

const styles = StyleSheet.create({
  container: {
    height: "auto",
    flex: 1,
  },
  textInputTitle: {
    height: "auto",
    width: "auto",
    padding: 10,
    fontWeight: "bold",
    fontSize: 30,
  },
  textInputDesc: {
    height: "auto",
    width: "auto",
    padding: 10,
    fontSize: 20,
  },
  iconSave: {
    position: "absolute",
    bottom: 30,
    right: 25,
    pointerEvents: "auto",
  },
});
