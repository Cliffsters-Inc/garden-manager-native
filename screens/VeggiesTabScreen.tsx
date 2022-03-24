import React from "react";
import { StyleSheet } from "react-native";
import { RootTabScreenProps } from "../types";
import { View } from "../components/Themed";
import { VeggieList } from "../components/VeggieList";

export const VeggiesTabScreen = ({
  navigation,
}: RootTabScreenProps<"VeggiesTab">) => {
  return (
    <View style={styles.container}>
      <VeggieList navigation={navigation} />
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
