import { useRoute } from "@react-navigation/native";
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
  const route = useRoute();
  const routeName = route.name;

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
            routeName={routeName}
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
    padding: 15,
    marginTop: 50,
  },
});
