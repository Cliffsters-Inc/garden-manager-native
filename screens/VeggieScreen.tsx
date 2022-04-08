import { StyleSheet } from "react-native";
import { View, Text } from "../components/Themed";
import { GardenTabScreenProps } from "../types";

export const VeggieScreen = ({
  navigation,
  route,
}: GardenTabScreenProps<"VeggieScreen">) => {
  const { veggie } = route.params;
  return (
    <View style={styles.container}>
      <Text>Name: {veggie.name}</Text>
      {veggie.sowDate && <Text>Sowed: {veggie.sowDate}</Text>}
      {veggie.harvestDate && <Text>Harvest: {veggie.harvestDate}</Text>}
      {veggie.notes && <Text>Notes: {veggie.notes}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
