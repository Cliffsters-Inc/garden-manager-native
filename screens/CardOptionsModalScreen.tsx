import { Divider } from "react-native-elements";
import { Text, View } from "../components/Themed";
import { gardenSelectors } from "../services/garden/garden.selectors";
import { useAppSelector } from "../store";
import { RootStackScreenProps } from "../types";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export const CardOptionsModalScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"CardOptionsModal">) => {
  const { selectedGardenId, selectedBedId, routeName } = route.params;

  return (
    <View style={styles.container}>
      <Divider />
      <Pressable
        style={styles.optionContainer}
        onPress={() =>
          navigation.navigate("RenameCardModal", {
            selectedGardenId,
            selectedBedId,
            routeName,
          })
        }
      >
        <MaterialIcons
          name="drive-file-rename-outline"
          size={24}
          color="black"
        />
        <Text style={styles.optionText}>Rename</Text>
      </Pressable>
      <Divider />
      <Pressable
        style={styles.optionContainer}
        onPress={() =>
          navigation.navigate("DeleteConfirmationModal", {
            selectedGardenId,
            selectedBedId,
          })
        }
      >
        <MaterialCommunityIcons
          name="delete-alert-outline"
          size={36}
          color="red"
        />
        <Text style={[styles.optionText, { color: "red" }]}>Delete</Text>
      </Pressable>
      <Divider />
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
