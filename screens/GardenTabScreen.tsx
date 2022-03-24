import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { GardenTabScreenProps } from "../types";
import { AddBedField } from "../components/AddBedField";
import { GardenCards } from "../components/GardenCards";
import { AddGardenCard } from "../components/AddGardenCard";

export const GardenTabScreen = ({
  navigation,
}: GardenTabScreenProps<"GardenTabScreen">) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Garden Beds</Text>
      {/* <GardenBedsList /> */}
      <AddGardenCard />
      <GardenCards />
      <AddBedField />
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
    marginTop: "20%",
  },
});
