import React from "react";
import { StyleSheet } from "react-native";
import { ActionButton } from "../components/shared/ActionButton";
import { View, Text } from "../components/Themed";
import { VeggieList } from "../components/VeggieList";
import { gardenSelectors } from "../services/garden/gardenSlice";
import { useAppSelector } from "../store";
import { GardenTabScreenProps } from "../types";

export const BedScreen = ({
  navigation,
  route,
}: GardenTabScreenProps<"BedScreen">) => {
  const { selectedBedId, selectedGardenId } = route.params;
  const bed = useAppSelector((state) =>
    gardenSelectors.selectCurrentBed(state, selectedGardenId, selectedBedId)
  );
  return bed ? (
    <View style={styles.container}>
      <Text>Bed Name: {bed.name}</Text>
      {bed.veggies && (
        <VeggieList
          veggies={bed.veggies}
          navigationHandler={(veggie) =>
            navigation.navigate("VeggieScreen", {
              selectedGardenId,
              selectedBedId,
              veggieId: veggie.id,
            })
          }
        />
      )}
      <ActionButton
        text="Add Veggie"
        onPress={() =>
          navigation.navigate("AddVeggieModal", {
            selectedGardenId,
            selectedBedId,
          })
        }
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
