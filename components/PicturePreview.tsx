import { Feather } from "@expo/vector-icons";
import { useContext, useLayoutEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet } from "react-native";
import { RootStackScreenProps } from "../types";
import { View } from "./Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-elements";
import { picIdContext } from "../services/context";
import { nanoid } from "@reduxjs/toolkit";

export const PicturePreview = ({
  navigation,
  route,
}: RootStackScreenProps<"PicturePreview">) => {
  const { photo, veggieId, resumePreview } = route.params;
  const { picId, setPicId } = useContext(picIdContext);
  const [test, setTest] = useState("testState");

  const navigateBack = () => {
    navigation.goBack();
  };

  const backToCamera = () => {
    resumePreview();
    navigateBack();
  };

  const storePic = async () => {
    const picToSave = photo;
    const newId = nanoid();
    setPicId(`@pic#${newId}`);
    await AsyncStorage.setItem(`@pic#${newId}`, picToSave);
    navigation.pop(2);
  };

  console.log("Preview picId", picId);

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: photo }} style={styles.image}>
        <Feather
          name="x"
          size={36}
          color="white"
          onPress={backToCamera}
          style={styles.xIcon}
        />
        <Button title={"Save to log"} onPress={storePic} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  image: {
    flex: 0.6,
    marginTop: 50,
    marginHorizontal: 10,
  },
  xIcon: {
    padding: 20,
  },
});
