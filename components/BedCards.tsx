import { FunctionComponent } from "react";
import { FlatList, Pressable } from "react-native";
import { Button, Card } from "react-native-elements";
import { gardenActions, gardenSelectors } from "../services/garden/gardenSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { Text, View } from "./Themed";

type BedCardsProps = {
  selectedGardenId: string;
};

export const BedCards: FunctionComponent<BedCardsProps> = ({
  selectedGardenId,
}) => {
  const appDispatch = useAppDispatch();
  const gardens = useAppSelector(gardenSelectors.selectGardens);

  const selectedGardenObject = gardens.find(
    (garden) => garden.id === selectedGardenId
  );

  const beds = selectedGardenObject?.beds;

  const handlePress = () => {
    appDispatch(gardenActions.addBed({ id: selectedGardenId }));
  };

  return (
    <View>
      <Text>{selectedGardenObject?.name}</Text>
      <FlatList
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={beds}
        renderItem={({ item }) => (
          <Pressable>
            <Card>
              <Card.Title>{item.name}</Card.Title>
            </Card>
          </Pressable>
        )}
      ></FlatList>
      <Button onPress={handlePress}>Add Bed</Button>
    </View>
  );
};
