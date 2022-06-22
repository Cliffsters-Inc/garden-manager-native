import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { Camera } from "expo-camera";
import { Button } from "react-native-elements";

export const CameraModal = ({
  navigation,
  route,
}: RootStackScreenProps<"CameraModal">) => {
  const { selectedGardenId, selectedBedId, veggieId } = route.params;
  const [hasCameraPermission, setHasCameraPermission] = useState<
    null | boolean
  >(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera. Please check settings.</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera}>
        <Button
          // size="lg"
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainer}
        />
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 0.8,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    height: 110,
    width: "100vw",
    // backgroundColor: "white",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: "white",
  },
});
