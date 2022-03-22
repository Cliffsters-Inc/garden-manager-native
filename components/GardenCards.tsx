import { FunctionComponent } from "react";
import { FlatList, Pressable, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { gardenSelectors } from "../services/garden/gardenSlice";
import { useAppSelector } from "../store";

interface GardenCardsProps {}

export const GardenCards: FunctionComponent<GardenCardsProps> = () => {
  const gardens = useAppSelector(gardenSelectors.selectGardens);

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={gardens}
        renderItem={({ item }) => (
          <Pressable>
            <Card containerStyle={styles.card}>
              <Card.Title>{item.name}</Card.Title>
            </Card>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 15,
  },
  card: {
    minHeight: 80,
    minWidth: 100,
    // margin: 5,
    // padding: 20,
    borderWidth: 1,
  },
});
