import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";

import { RootStackScreenProps } from "../../navigation/navigation.types";
import { Text, View } from "../Themed";

export const CardOptionsModal = ({
  navigation,
  route,
}: RootStackScreenProps<"CardOptionsModal">) => {
  const { selectedGardenId, selectedBedId } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.optionContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            selectedGardenId
              ? navigation.navigate("RenameCardModal", { selectedGardenId })
              : selectedBedId &&
                navigation.navigate("RenameCardModal", { selectedBedId });
          }}
        >
          <MaterialIcons
            name="drive-file-rename-outline"
            size={36}
            color="#000000"
          />
          <Text style={styles.optionText}>Rename</Text>
        </Pressable>
        <Divider />
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.goBack();
            selectedGardenId
              ? navigation.navigate("DeleteConfirmationModal", {
                  selectedGardenId,
                })
              : selectedBedId &&
                navigation.navigate("DeleteConfirmationModal", {
                  selectedBedId,
                });
          }}
        >
          <MaterialCommunityIcons
            name="delete-alert-outline"
            size={36}
            color="#ff0000"
          />
          <Text style={[styles.optionText, { color: "#ff0000" }]}>Delete</Text>
        </Pressable>
        <Divider />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(52, 52, 52, 0.2)",
  },
  optionContainer: {
    paddingHorizontal: 40,
    paddingBottom: 100,
  },
  button: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10,
  },
  optionText: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 10,
  },
});
