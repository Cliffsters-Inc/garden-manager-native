import { Feather } from "@expo/vector-icons";
import { useLayoutEffect } from "react";
import { Image, ImageBackground, StyleSheet } from "react-native";
import { RootStackScreenProps } from "../types";
import { Text, View } from "./Themed";

export const PicturePreview = ({
  navigation,
  route,
}: RootStackScreenProps<"PicturePreview">) => {
  const { photo, resumePreview } = route.params;
  console.log("picPreview", photo);

  const navigateBack = () => {
    navigation.goBack();
  };

  const backToCamera = () => {
    resumePreview();
    navigateBack();
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
