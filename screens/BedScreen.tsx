import React from "react";
import { View, Text } from "../components/Themed";
import { GardenTabScreenProps } from "../types";

export const BedScreen = ({
  navigation,
  route,
}: GardenTabScreenProps<"BedScreen">) => {
  const { bed } = route.params;

  console.log("Bed on bed screen", { bed });

  return (
    <View>
      <Text>Bed Name: {bed.name}</Text>
    </View>
  );
};
