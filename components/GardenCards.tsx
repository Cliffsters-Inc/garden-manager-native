import React from "react";
import { FunctionComponent } from "react";
import { FlatList, Pressable, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { gardenSelectors } from "../services/garden/gardenSlice";
import { useAppSelector } from "../store";
import { AddGardenCard } from "./AddGardenCard";

interface GardenCardsProps {}

export const GardenCards: FunctionComponent<GardenCardsProps> = () => {
  const gardens = useAppSelector(gardenSelectors.selectGardens);

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 15,
  },
  card: {
    minHeight: 80,
    minWidth: 100,
    borderWidth: 1,
  },
});
