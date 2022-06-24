import { Feather } from "@expo/vector-icons";
import { useLayoutEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet } from "react-native";
import { RootStackScreenProps } from "../types";
import { View } from "./Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-elements";

export const PicturePreview = ({
  navigation,
  route,
}: RootStackScreenProps<"PicturePreview">) => {
  const { photo, veggieId, resumePreview } = route.params;
  const [picKey, setPicKey] = useState<string>("test");
  console.log("picPreview", photo);

  const navigateBack = () => {
    navigation.goBack();
  };

  const backToCamera = () => {
    resumePreview();
    navigateBack();
  };

  const storePic = async () => {
    const picToSave = photo;
    await AsyncStorage.setItem(`@pic${veggieId}`, picToSave);
    setPicKey(`@pic${veggieId}`);
    //below causes us to to make these props conditional, better way?
    // navigation.navigate("NewVeggieLogModal", {
    //   picKey,
    // });
    navigation.navigate({
      name: "NewVeggieLogModal",
      params: { picKey: picKey },
      merge: true,
    });
  };

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
