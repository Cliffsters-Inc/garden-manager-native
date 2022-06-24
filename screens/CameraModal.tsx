import {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { Camera, CameraCapturedPicture } from "expo-camera";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CameraModal = ({
  navigation,
  route,
}: RootStackScreenProps<"CameraModal">) => {
  let camera: Camera | null;
  const { selectedGardenId, selectedBedId, veggieId } = route.params;
  const [hasCameraPermission, setHasCameraPermission] = useState<
    null | boolean
  >(null);
  const [photo, setPhoto] = useState<string>("");
  const [pausePreview, setPausePreview] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);
  console.log("***camerModal Render***");

  let takePic = async () => {
    camera?.pausePreview();

    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    console.log("beforePhoto");
    const newPhoto: CameraCapturedPicture = await camera!.takePictureAsync(
      options
    );
    setPhoto(newPhoto.uri);
    setPausePreview(true);
    console.log("afterPhoto");
  };

  const navigateToPreview = () => {
    console.log("navrun");
    navigation.navigate("PicturePreview", {
      photo,
      veggieId,
      resumePreview,
    });
  };

  const resumePreview = () => {
    setPausePreview(false);
  };

  useEffect(() => {
    if (pausePreview === false) {
      camera?.resumePreview();
    }
  }, [pausePreview]);

  useEffect(() => {
    console.log("photo ", photo);
    console.log("effect");
    if (photo !== "") {
      console.log("navrun");
      navigateToPreview();
    }
  }, [photo]);

  const checkStorage = () => {
    AsyncStorage.getItem("@pic").then((res) => console.log("preview", res));
  };

  const con = () => {
    console.log("photo ", photo);
    checkStorage();
  };

  return hasCameraPermission ? (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={(r) => {
          camera = r;
        }}
      >
        <Button
          // size="lg"
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainer}
          onPress={takePic}
        />
      </Camera>
      <Button title={"con"} onPress={con} />
    </View>
  ) : (
    <Text>No access to camera. Please check settings.</Text>
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
