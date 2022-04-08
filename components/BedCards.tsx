import { FunctionComponent } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { gardenSelectors } from "../services/garden/gardenSlice";
import { useAppSelector } from "../store";
import { Text, View } from "./Themed";

type BedCardsProps = {
  selectedGardenId: string;
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
    <View style={styles.container}>
      <Text>{selectedGardenObject?.name}</Text>
      <FlatList
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={beds}
        renderItem={({ item }) => (
          <Pressable>
            <Card containerStyle={styles.card}>
              <Card.Title>{item.name}</Card.Title>
            </Card>
          </Pressable>
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 15,
  },
  card: {
    minHeight: 100,
    minWidth: 150,
    borderWidth: 1,
  },
});
