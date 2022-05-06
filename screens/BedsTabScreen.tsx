import { useState } from "react";
import { StyleSheet } from "react-native";
import { BedCards } from "../components/BedCards";
import { AddCardButton } from "../components/shared/AddCardButton";
import { View } from "../components/Themed";
import { GardenTabScreenProps } from "../types";

export const BedsTabScreen = ({
  navigation,
  route,
}: GardenTabScreenProps<"BedsTabScreen">) => {
  const { selectedGardenId } = route.params;
  const areaTitle = "bed";
  const routeName = route.name;

  return (
    <View style={styles.container}>
      <View style={styles.cards}>
        <BedCards selectedGardenId={selectedGardenId} navigation={navigation} />
      </View>
      <View style={styles.button}>
        <AddCardButton
          routeName={routeName}
          selectedGardenId={selectedGardenId}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cards: {
    flex: 5,
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
