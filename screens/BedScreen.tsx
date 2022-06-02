import React from "react";
import { StyleSheet } from "react-native";
import { ActionButton } from "../components/shared/ActionButton";
import { View, Text } from "../components/Themed";
import { VeggieList } from "../components/VeggieList";
import { bedSelectors } from "../services/bed/bed.slice";
import { veggieSelectors } from "../services/veggie/veggie.slice";
import { useAppSelector } from "../store";
import { GardenTabScreenProps } from "../types";

export const BedScreen = ({
  navigation,
  route,
}: GardenTabScreenProps<"BedScreen">) => {
  const { selectedBedId } = route.params;
  const bed = useAppSelector((state) =>
    bedSelectors.selectById(state, selectedBedId)
  );
  const veggies = useAppSelector((state) =>
    veggieSelectors.selectByIds(state, bed?.veggies ?? [])
  );

  return bed ? (
    <View style={styles.container}>
      <Text>Bed Name: {bed.name}</Text>
      {bed.veggies && (
        <VeggieList
          veggies={veggies}
          navigationHandler={(veggie) =>
            navigation.navigate("VeggieScreen", { veggieId: veggie.id })
          }
        />
      )}
      <ActionButton
        text="Add Veggie"
        onPress={() => navigation.navigate("AddVeggieModal", { selectedBedId })}
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
