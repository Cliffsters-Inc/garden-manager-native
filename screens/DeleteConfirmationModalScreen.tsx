import { useAppDispatch } from "../store";
import { RootStackScreenProps } from "../types";
import { Text, View } from "../components/Themed";
import { Button, Divider } from "react-native-elements";
import { gardenActions } from "../services/garden/gardenSlice";
import { StyleSheet } from "react-native";

export const DeleteConfirmationModalScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"DeleteConfirmationModal">) => {
  const appDispatch = useAppDispatch();
  const { selectedGardenId, selectedBedId } = route.params;

  const deleteGardenCard = () => {
    appDispatch(gardenActions.removeGarden(selectedGardenId));
    console.log(`***Deleting ${selectedGardenId}`);
    navigation.popToTop();
  };

  const deleteBedCard = () => {
    appDispatch(
      gardenActions.removeBed({
        gardenId: selectedGardenId,
        bedId: selectedBedId,
      })
    );
    console.log(`***Deleting ${selectedGardenId}`);
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
          {!selectedBedId ? (
            <Button
              style={styles.button}
              type="clear"
              title={"Delete"}
              titleStyle={{ color: "#FF0000", fontWeight: "bold" }}
              onPress={deleteGardenCard}
            />
          ) : (
            <Button
              style={styles.button}
              title={"Delete"}
              onPress={deleteBedCard}
            />
          )}
        </View>

        <Button
          style={styles.button}
          buttonStyle={{
            backgroundColor: "#ffffff",
            borderRadius: 20,
            marginBottom: 40,
          }}
          type="clear"
          title={"Cancel"}
          titleStyle={{ color: "#0000cd", fontWeight: "bold" }}
          onPress={() => navigation.goBack()}
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
