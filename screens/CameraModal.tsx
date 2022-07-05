import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { Camera as ExpoCamera } from "expo-camera";
import { RootStackScreenProps } from "../types";
import { useAppDispatch, useAppSelector } from "../store";
import { photoActions, photoSelectors } from "../services/photos/photos.slice";

export const CameraModal = ({
  navigation,
}: RootStackScreenProps<"CameraModal">) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(ExpoCamera.Constants.Type.back);
  const cameraRef = useRef<ExpoCamera>(null);

  const dispatch = useAppDispatch();
  const previewPhoto = useAppSelector(photoSelectors.selectPreviewPhoto);

  const handleTakePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    if (photo) dispatch(photoActions.setPhotoPreview(photo.uri));
  };

  const handleCancel = () => {
    dispatch(photoActions.cancelPhotoPreview());
  };

  const handleKeep = () => {
    dispatch(photoActions.confirmPhotoPreview());
    navigation.goBack();
  };

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    // Required within useEffect and not useLayoutEffect or within initial navigation opts as react navigation state can not be set while component is mounting which needs to wait for camera to initialise
    if (hasPermission) {
      const takingPhotoHeader = {
        headerLeft: () => null,
        headerRight: () => (
          <Button
            title="Done"
            color="#ffaa00"
            onPress={() => navigation.goBack()}
          />
        ),
      };
      const photoPreviewHeader = {
        headerLeft: () => (
          <Button title="Cancel" color="#ffaa00" onPress={handleCancel} />
        ),
        headerRight: () => (
          <Button title="Keep" color="#ffaa00" onPress={handleKeep} />
        ),
      };

      navigation.setOptions(
        previewPhoto ? photoPreviewHeader : takingPhotoHeader
      );
    }
  }, [hasPermission, previewPhoto]);

  if (previewPhoto) {
    return (
      <View>
        <Image
          style={{ width: "100%", height: "100%" }}
          source={{ uri: previewPhoto }}
        />
      </View>
    );
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <ExpoCamera ref={cameraRef} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleTakePicture}
          >
            <View style={styles.buttonInner} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => {
              setType(
                type === ExpoCamera.Constants.Type.back
                  ? ExpoCamera.Constants.Type.front
                  : ExpoCamera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </ExpoCamera>
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
