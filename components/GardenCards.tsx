import React from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { Button, Card } from "react-native-elements";
import Navigation from "../navigation";
import { BedsTabScreen } from "../screens/BedsTabScreen";
import { gardenSelectors } from "../services/garden/gardenSlice";
import { useAppSelector } from "../store";
import { GardenTabScreenProps } from "../types";
import { View } from "./Themed";

type GardenCardsProps = {
  setSelectedGardenId: React.Dispatch<React.SetStateAction<string>>;
  navigation: GardenTabScreenProps<"GardenTabScreen">["navigation"];
};

export const GardenCards = ({
  setSelectedGardenId,
  navigation,
}: GardenCardsProps) => {
  const gardens = useAppSelector(gardenSelectors.selectGardens);
  const setSelectedGarden = setSelectedGardenId;

  const nav = () => {
    console.log("navTest");
    navigation.navigate("BedsTabScreen");
  };

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={gardens}
        renderItem={({ item }) => (
          <Pressable onPress={() => setSelectedGarden(item.id)}>
            <Card containerStyle={styles.card}>
              <Card.Title>{item.name}</Card.Title>
            </Card>
          </Pressable>
        )}
      />
      <Button onPress={nav}>nav</Button>
    </View>
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
    minHeight: 100,
    minWidth: 150,
    borderWidth: 1,
  },
});
