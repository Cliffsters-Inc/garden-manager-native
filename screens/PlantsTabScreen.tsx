import React from "react";
import { StyleSheet } from "react-native";
import { RootTabScreenProps } from "../types";
import { View } from "../components/Themed";
import { PlantList } from "../components/PlantList";

export const PlantsTabScreen = ({
  navigation,
}: RootTabScreenProps<"PlantsTab">) => {
  return (
    <View style={styles.container}>
      <PlantList navigation={navigation} />
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
