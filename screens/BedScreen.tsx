import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { View, Text } from "../components/Themed";
import { VeggieList } from "../components/VeggieList";
import { Veggie } from "../services/types";
import { GardenTabScreenProps } from "../types";

export const BedScreen = ({
  navigation,
  route,
}: GardenTabScreenProps<"BedScreen">) => {
  const { bed } = route.params;

  return (
    <View style={styles.container}>
      <Text>Bed Name: {bed.name}</Text>
      {bed.veggies && (
        <VeggieList
          veggies={bed.veggies}
          navigationHandler={(veggie: Veggie) =>
            navigation.navigate("VeggieScreen", { veggie })
          }
        />
      )}
      <Pressable
        onPress={() => navigation.navigate("AddVeggieModal")}
        style={styles.createBtnContainer}
      >
        <Text style={styles.createBtn}>Add Veggie</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  createBtnContainer: {
    backgroundColor: "#ffaa72",
    padding: 15,
    borderRadius: 200,
    position: "absolute",
    bottom: 20,
    right: 20,
    shadowColor: "#ffaa72",
    shadowOpacity: 0.75,
    shadowOffset: { width: 3, height: 3 },
  },
  createBtn: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
});
