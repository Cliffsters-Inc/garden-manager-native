import { Plant } from "../services/types";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { format } from "date-fns";

type Props = {
  plants?: Plant[];
};

export const PlantsList = ({ plants }: Props) => {
  return plants ? (
    <FlatList
      style={styles.container}
      data={plants}
      renderItem={({ item }) => (
        <View key={item.id} style={styles.plantContainer}>
          <Text style={{ color: "green" }}>{item.name}</Text>
          {item.notes && <Text>Notes: {item.notes}</Text>}
          <Text style={{ color: "gray" }}>
            Plantation: {format(new Date(item.plantationDate), "dd/MMM/yy")}
          </Text>
          {item.harvestDate && (
            <Text style={{ color: "gray" }}>
              Harvest: {format(new Date(item.harvestDate), "dd/MMM/yy")}
            </Text>
          )}
        </View>
      )}
    />
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginBottom: 10,
  },
  plantContainer: {
    marginVertical: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
