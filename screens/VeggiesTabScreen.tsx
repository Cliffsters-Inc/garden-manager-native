import React from "react";
import { StyleSheet } from "react-native";
import { VeggiesTabScreenProps } from "../types";
import { View } from "../components/Themed";
import { VeggieList } from "../components/VeggieList";
import { mockData } from "../services/mockData";

export const VeggiesTabScreen = ({
  navigation,
}: VeggiesTabScreenProps<"VeggiesTabScreen">) => {
  const { veggies } = mockData;

  return (
    <View style={styles.container}>
      <VeggieList
        veggies={veggies}
        navigationHandler={(veggie) =>
          navigation.navigate("VeggieInfoScreen", {
            title: veggie.name,
            veggieInfo: veggie,
          })
        }
      />
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
