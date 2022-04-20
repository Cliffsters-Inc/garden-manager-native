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
  const { selectedGardenId } = route.params;

  const deleteCard = () => {
    appDispatch(gardenActions.removeCard(selectedGardenId));
    console.log(`***Deleting ${selectedGardenId}`);
    navigation.goBack();
  };

  return (
    <View>
      <Button title={"Delete"} onPress={deleteCard} />
      <Button title={"Cancel"} onPress={() => navigation.goBack()} />
    </View>
  );
};
