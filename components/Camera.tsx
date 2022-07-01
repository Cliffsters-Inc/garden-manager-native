import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { Camera } from "expo-camera";
import { RootStackScreenProps } from "../types";

export const CameraModal = ({
  navigation,
}: RootStackScreenProps<"CameraModal">) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    // Required within useEffect and not useLayoutEffect or within initial navigation opts as react navigation state can not be set while component is mounting which needs to wait for camera to initialise
    if (hasPermission)
      navigation.setOptions({
        headerRight: () => (
          <Button title="Done" color="#ffaa00" onPress={navigation.goBack} />
        ),
      });
  }, [hasPermission]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <View style={styles.buttonInner} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  buttonContainer: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  captureButton: {
    borderWidth: 7,
    borderColor: "#eee",
    borderRadius: 100,
    width: 76,
    height: 76,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonInner: {
    backgroundColor: "#eee",
    width: 58,
    height: 58,
    borderRadius: 100,
  },
  flipButton: {
    width: 50,
    height: 50,
    backgroundColor: "#ffaa00",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    right: 30,
  },
  text: { fontWeight: "bold" },
});
