import React, { useEffect } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { gardenSelectors } from "../services/garden/gardenSlice";
import { useAppSelector } from "../store";
import { GardenTabScreenProps } from "../types";
import { View } from "./Themed";

type GardenCardsProps = {
  setSelectedGardenId: React.Dispatch<React.SetStateAction<string>>;
  navigation: GardenTabScreenProps<"GardenTabScreen">["navigation"];
  selectedGardenId: string;
};

export const GardenCards = ({
  setSelectedGardenId,
  navigation,
  selectedGardenId,
}: GardenCardsProps) => {
  const gardens = useAppSelector(gardenSelectors.selectGardens);
  const setSelectedGarden = setSelectedGardenId;

  const handlePress = async (id: string) => {
    setSelectedGarden(id);
    console.log("id: ", selectedGardenId);
  };

  useEffect(() => {
    if (selectedGardenId !== "") {
      navigation.navigate("BedsTabScreen", { id: selectedGardenId });
    }
  }, [selectedGardenId]);

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={gardens}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item.id)}>
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
