import React from "react";
import { FunctionComponent } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { Button, Card } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { gardenSelectors } from "../services/garden/gardenSlice";
import { useAppSelector } from "../store";
import { GardenTabScreenProps } from "../types";

type GardenCardsProps = {
  setSelectedGardenId: React.Dispatch<React.SetStateAction<string>>;
  navigation: GardenTabScreenProps<"GardenTabScreen">["navigation"];
};

export const GardenCards = (props: any, { navigation }: GardenCardsProps) => {
  const gardens = useAppSelector(gardenSelectors.selectGardens);
  const setSelectedGarden = props.setSelectedGardenId;

  const nav = () => {
    console.log("navTest");
    navigation.navigate("BedsTabScreen");
  };

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
      <Button onPress={nav}>nav</Button>
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
