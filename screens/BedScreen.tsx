import React from "react";
import { View, Text } from "../components/Themed";
import { VeggieList } from "../components/VeggieList";
import { GardenTabScreenProps } from "../types";

export const BedScreen = ({
  navigation,
  route,
}: GardenTabScreenProps<"BedScreen">) => {
  const { bed } = route.params;

  return (
    <View>
      <Text>Bed Name: {bed.name}</Text>
      {bed.veggies && <VeggieList veggies={bed.veggies} />}
    </View>
  );
};