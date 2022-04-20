import { Divider } from "react-native-elements";
import { Text, View } from "../components/Themed";
import { gardenActions, gardenSelectors } from "../services/garden/gardenSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { RootStackScreenProps } from "../types";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export const CardOptionsModalScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"CardOptionsModal">) => {
  const gardens = useAppSelector(gardenSelectors.selectGardens);

  const { selectedGardenId } = route.params;
  const selectedGardenObject = gardens.find(
    (garden) => garden.id === selectedGardenId
  );
  console.log("selected: ", selectedGardenId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedGardenObject?.name}</Text>
      <Divider />
      <Pressable
        style={styles.optionContainer}
        onPress={() => console.log("test1")}
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
  title: {
    flex: 0.1,
    backgroundColor: "yellow",
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
