import { useAppDispatch } from "../store";
import { RootStackScreenProps } from "../types";
import { View } from "../components/Themed";
import { Button } from "react-native-elements";
import { gardenActions } from "../services/garden/gardenSlice";

export const DeleteConfirmationModalScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"DeleteConfirmationModal">) => {
  const appDispatch = useAppDispatch();
  const { selectedGardenId, bedId } = route.params;

  const deleteGardenCard = () => {
    appDispatch(gardenActions.removeGarden(selectedGardenId));
    console.log(`***Deleting ${selectedGardenId}`);
    navigation.popToTop();
  };

  const deleteBedCard = () => {
    appDispatch(
      gardenActions.removeBed({ gardenId: selectedGardenId, bedId: bedId })
    );
    console.log(`***Deleting ${selectedGardenId}`);
    navigation.popToTop();
  };

  return (
    <View>
      {!bedId ? (
        <Button title={"Delete"} onPress={deleteGardenCard} />
      ) : (
        <Button title={"Delete"} onPress={deleteBedCard} />
      )}

      <Button title={"Cancel"} onPress={() => navigation.goBack()} />
    </View>
  );
};
