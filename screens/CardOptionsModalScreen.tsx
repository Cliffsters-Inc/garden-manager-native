import { Divider } from "react-native-elements";
import { Text, View } from "../components/Themed";
import { gardenSelectors } from "../services/garden/gardenSlice";
import { useAppSelector } from "../store";
import { RootStackScreenProps } from "../types";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export const CardOptionsModalScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"CardOptionsModal">) => {
  const gardens = useAppSelector(gardenSelectors.selectGardens);

  const { selectedGardenId, selectedBedId, routeName, title } = route.params;

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
    flex: 0.7,
  },
  rename: {
    flex: 0.1,
  },
  optionContainer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 10,
  },
  optionText: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});
