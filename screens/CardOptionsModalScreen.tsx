import { Divider } from "react-native-elements";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export const CardOptionsModalScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"CardOptionsModal">) => {
  const { selectedGardenId, selectedBedId, routeName } = route.params;

  const popThenNavigate = () => {
    navigation.pop(),
      navigation.navigate("DeleteConfirmationModal", {
        selectedGardenId,
        selectedBedId,
      });
  };

  return (
    <View style={styles.container}>
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
          color="#000000"
        />
        <Text style={styles.optionText}>Rename</Text>
      </Pressable>
      <Divider />
      <Pressable style={styles.optionContainer} onPress={popThenNavigate}>
        <MaterialCommunityIcons
          name="delete-alert-outline"
          size={36}
          color="#ff0000"
        />
        <Text style={[styles.optionText, { color: "#ff0000" }]}>Delete</Text>
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
