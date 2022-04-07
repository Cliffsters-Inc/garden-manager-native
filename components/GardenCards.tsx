import React from "react";
import { FunctionComponent } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { gardenSelectors } from "../services/garden/gardenSlice";
import { useAppSelector } from "../store";

type GardenCardsProps = {
  setSelectedGardenId: React.Dispatch<React.SetStateAction<string>>;
};

export const GardenCards: FunctionComponent<GardenCardsProps> = ({
  setSelectedGardenId: setSelectedGarden,
}) => {
  const gardens = useAppSelector(gardenSelectors.selectGardens);

  // const handlePress = () => {

  // }

  return (
    <SafeAreaView style={styles.container}>
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
    minHeight: 100,
    minWidth: 150,
    borderWidth: 1,
  },
});
