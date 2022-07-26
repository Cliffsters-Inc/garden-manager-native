import { useAppDispatch } from "../store";
import { RootStackScreenProps } from "../types";
import { Text, View } from "../components/Themed";
import { Button, Divider } from "react-native-elements";
import { StyleSheet } from "react-native";
import { bedActions } from "../services/bed/bed.slice";
import { gardenActions } from "../services/garden/garden.slice";

export const DeleteConfirmationModalScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"DeleteConfirmationModal">) => {
  const appDispatch = useAppDispatch();
  const { selectedGardenId, selectedBedId } = route.params;

  const handleDelete = () => {
    if (selectedGardenId) appDispatch(gardenActions.remove(selectedGardenId));
    else if (selectedBedId) appDispatch(bedActions.remove(selectedBedId));

    navigation.popToTop();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(52, 52, 52, 0.2)",
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            marginHorizontal: 30,
            borderRadius: 20,
          }}
        >
          <Text style={styles.header}>
            Are you sure you want to delete this item?
          </Text>
          <Divider />
          <Button
            onPress={handleDelete}
            buttonStyle={styles.button}
            type="clear"
            title="Delete"
            testID="delete-confirmation-btn"
            titleStyle={{ color: "#FF0000", fontWeight: "bold" }}
          />
        </View>
        <Button
          onPress={() => navigation.goBack()}
          style={styles.button}
          buttonStyle={{
            backgroundColor: "#ffffff",
            borderRadius: 20,
            marginBottom: 40,
          }}
          type="clear"
          title={"Cancel"}
          titleStyle={{ color: "#0000cd", fontWeight: "bold" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  header: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    paddingHorizontal: 30,
    marginTop: 10,
    fontWeight: "bold",
  },
});
