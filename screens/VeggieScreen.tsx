import { StyleSheet, Image } from "react-native";
import { View, Text } from "../components/Themed";
import { GardenTabScreenProps } from "../types";
import { format } from "date-fns";

export const VeggieScreen = ({
  navigation,
  route,
}: GardenTabScreenProps<"VeggieScreen">) => {
  const { veggie } = route.params;
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Image style={styles.img} source={{ uri: veggie.veggieInfo.image }} />
        <View style={{ alignItems: "flex-end" }}>
          <Text>
            Sowed:{" "}
            {veggie.sowDate && format(new Date(veggie.sowDate), "dd/MM/yy")}
          </Text>
          <Text>
            Harvest:{" "}
            {veggie.harvestDate &&
              format(new Date(veggie.harvestDate), "dd/MM/yy")}
          </Text>
        </View>
      </View>
      <Text style={styles.title}>{veggie.veggieInfo.name}</Text>
      <Text>Notes: {veggie.notes && veggie.notes}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
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
