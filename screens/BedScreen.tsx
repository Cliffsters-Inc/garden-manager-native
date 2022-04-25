import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { View, Text } from "../components/Themed";
import { VeggieList } from "../components/VeggieList";
import { gardenSelectors } from "../services/garden/gardenSlice";
import { useAppSelector } from "../store";
import { GardenTabScreenProps } from "../types";

export const BedScreen = ({
  navigation,
  route,
}: GardenTabScreenProps<"BedScreen">) => {
  const { selectedBedId, selectedGardenId } = route.params;
  const bed = useAppSelector((state) =>
    gardenSelectors.selectBed(state, selectedGardenId, selectedBedId)
  );
  return bed ? (
    <View style={styles.container}>
      <Text>Bed Name: {bed.name}</Text>
      {bed.veggies && (
        <VeggieList
          veggies={bed.veggies}
          navigationHandler={(veggie) =>
            navigation.navigate("VeggieScreen", {
              selectedGardenId,
              selectedBedId,
              veggieId: veggie.id,
            })
          }
        />
      )}
      <Pressable
        onPress={() =>
          navigation.navigate("AddVeggieModal", {
            selectedGardenId,
            selectedBedId,
          })
        }
        style={styles.createBtnContainer}
      >
        <Text style={styles.createBtn}>Add Veggie</Text>
      </Pressable>
    </View>
  ) : null;
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
