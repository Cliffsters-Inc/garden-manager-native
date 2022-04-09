import { StyleSheet, Image } from "react-native";
import { View, Text } from "../components/Themed";
import { GardenTabScreenProps } from "../types";

export const VeggieScreen = ({
  navigation,
  route,
}: GardenTabScreenProps<"VeggieScreen">) => {
  const { veggie } = route.params;
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: veggie.veggieInfo.image }} />
      <Text>Name: {veggie.veggieInfo.name}</Text>
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
  img: {
    width: 100,
    height: 100,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginRight: 10,
  },
});
