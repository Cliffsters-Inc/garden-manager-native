import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { gardenSelectors } from "../services/garden/gardenSlice";
import { useAppSelector } from "../store";
import { GardenTabScreenProps } from "../types";
import { CustomCard } from "./shared/CustomCard";
import { View } from "./Themed";

export const GardenCards = ({
  navigation,
}: GardenTabScreenProps<"GardenTabScreen">) => {
  const gardens = useAppSelector(gardenSelectors.selectGardens);

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={gardens}
        renderItem={({ item }) => (
          <CustomCard
            title={item.name}
            selectedGardenId={item.id}
            navigation={navigation}
          />
        )}
      />
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
    marginTop: 50,
  },
  card: {
    // flex: 1,
    minHeight: 100,
    minWidth: 150,
    borderWidth: 1,
    backgroundColor: "black",
  },
});
