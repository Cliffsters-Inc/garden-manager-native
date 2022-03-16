import { Plant } from "../services/types";
import { FlatList, Text, View, StyleSheet } from "react-native";

type Props = {
  plants?: Plant[];
};

export const PlantsList = ({ plants }: Props) => {
  return plants ? (
    <FlatList
      data={plants}
      renderItem={({ item }) => (
        <View style={styles.container} key={item.id}>
          <Text style={{ color: "green" }}>{item.name}</Text>
          {item.notes && <Text>Notes: {item.notes}</Text>}

          <View style={styles.separator} />
        </View>
      )}
    />
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: "80%",
  },
});
