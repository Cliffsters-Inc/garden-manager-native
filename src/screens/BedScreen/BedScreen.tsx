import React from "react";
import { StyleSheet } from "react-native";

import { ActionButton } from "../../components/ActionButton";
import { Text, View } from "../../components/Themed";
import { bedSelectors } from "../../features/bed/bed.slice";
import { gardenSelectors } from "../../features/garden/garden.slice";
import { veggieSelectors } from "../../features/veggie/veggie.slice";
import { GardenScreenProps } from "../../navigation/navigation.types";
import { useAppSelector } from "../../store";
import { VeggieList } from "./VeggieList";

export const BedScreen = ({
  navigation,
  route,
}: GardenScreenProps<"BedScreen">) => {
  const { selectedBedId, locationTitles } = route.params;

  const bed = useAppSelector((state) =>
    bedSelectors.selectById(state, selectedBedId)
  );
  const veggies = useAppSelector((state) =>
    veggieSelectors.selectByIds(state, bed?.veggies ?? [])
  );
  console.log("locTit2", locationTitles);
  return bed ? (
    <View style={styles.container}>
      <Text>Bed Name: {bed.name}</Text>
      {bed.veggies && (
        <VeggieList
          veggies={veggies}
          navigationHandler={(veggie) =>
            navigation.navigate("VeggieScreen", {
              veggieId: veggie.id,
              locationTitles,
            })
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
