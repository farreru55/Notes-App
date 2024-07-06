import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";

const Notes = [
  {
    id: "abc",
    notesTitle: "First Notes",
  },
  {
    id: "def",
    notesTitle: "Second Notes",
  },
  {
    id: "ghi",
    notesTitle: "Third Notes",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    styles={[styles.item, { backgroundColor }]}
  >
    <Text style={[styles.notesTitle, { color: textColor }]}>
      {item.notesTitle}
    </Text>
  </TouchableOpacity>
);

export default function Home() {
  const [selectedId, setSelectedId] = useState();
  const [text, onChangeText] = React.useState("");
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
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Skibidi Notes</Text>
        </View>
        <View style={styles.SearchCreate}>
          <View style={styles.search}>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeText}
              value={text}
              placeholder="Search"
            />
          </View>
          <View style={styles.create}>
            <Pressable>
              <Link href="/Create">
                <MaterialIcons name="create" size={24} color="grey" />
              </Link>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.containerNotes}>
        <FlatList
          data={Notes}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    fontFamily: "Exo-Regular",
    flexDirection: "column",
  },
  navbar: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
   borderRadius: 10, 
    width: "98%",
    height: "10%",
    backgroundColor: "lightgrey",
    position: "relative",
    top: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingEnd: 15,
    paddingStart: 5,
    marginBottom: 35,
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    height: "90%",
    width: "40%",
    backgroundColor: "white",
    borderRadius: 15,
  },
  titleText: {
    backgroundColor: "lightgrey",
    color: "black",
    padding: 5,
    fontFamily: "Exo-Regular",
  },
  SearchCreate: {
    marginVertical: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  search: {
    marginVertical: "auto",
    marginEnd: 20,
  },
  textInput: {
    backgroundColor: "white",
    height: "75%",
    width: 120,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    fontFamily: "Exo-Regular",
  },
  create: {
    marginVertical: "auto",
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  containerNotes: {
    width: "98%",
  },
  notesTitle: {
    backgroundColor: "lightgrey",
    color: "white",
    fontSize: 32,
    padding: 20,
    borderRadius: 2,
    marginBottom: 5,
    borderRadius: 10,
  },
});
