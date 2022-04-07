import { FunctionComponent } from "react";
import { FlatList, Pressable } from "react-native";
import { Card } from "react-native-elements";
import { gardenSelectors } from "../services/garden/gardenSlice";
import { useAppSelector } from "../store";
import { Text, View } from "./Themed";

type BedCardsProps = {
  selectedGardenId: Object;
};

export const BedCards: FunctionComponent<BedCardsProps> = ({
  selectedGardenId,
}) => {
  const gardens = useAppSelector(gardenSelectors.selectGardens);

  const selectedGardenObject = gardens.find(
    (garden) => garden.id === selectedGardenId
  );

  const beds = selectedGardenObject?.beds;

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
    </View>
  );
};
