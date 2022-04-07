import React from "react";
import { FunctionComponent } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { gardenSelectors } from "../services/garden/gardenSlice";
import { useAppSelector } from "../store";
import { View } from "./Themed";

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
    flex: 0.5,
  },
  card: {
    minHeight: 100,
    minWidth: 150,
    borderWidth: 10,
  },
});
