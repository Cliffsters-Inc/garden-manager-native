import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { useAppSelector } from "../store";
import { gardenSelectors } from "../services/garden/gardenSlice";
import { VeggiesList } from "./VeggiesList";

export const GardenBedsList = () => {
  const garden = useAppSelector(gardenSelectors.selectGardens);

  return (
    // <FlatList
    //   data={garden}
    //   renderItem={({ item }) => (
    //     <View key={item.id}>
    //       <Text style={styles.subTitle}>{item.name}</Text>
    //       <VeggiesList veggies={item.veggies} />
    //     </View>
    //   )}
    // />
    <View></View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: "80%",
  },
});
