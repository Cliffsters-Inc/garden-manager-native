import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { GardenTabScreenProps } from "../types";
import { GardenCards } from "../components/GardenCards";
import { AddGardenCard } from "../components/AddGardenCard";
import { useState } from "react";
import { BedCards } from "../components/BedCards";
import { AddBedCard } from "../components/AddBedCard";

export const GardenTabScreen = ({
  navigation,
}: GardenTabScreenProps<"GardenTabScreen">) => {
  const [selectedGardenId, setSelectedGardenId] = useState<string>("");
  return (
    <View style={styles.container}>
      <View>
        <AddGardenCard />
      </View>
      <View>
        <GardenCards setSelectedGardenId={setSelectedGardenId} />
      </View>
      <View>
        <AddBedCard selectedGardenId={selectedGardenId} />
      </View>
      <View>
        <BedCards selectedGardenId={selectedGardenId} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "50%",
    backgroundColor: "red",
  },
});
