import React from "react";
import { StyleSheet, Button, Text } from "react-native";
import { VeggiesTabScreenProps } from "../types";
import { View } from "../components/Themed";
import { VeggieList } from "../components/VeggieList";
import { useAppDispatch, useAppSelector } from "../store";
import { gardenActions, gardenSelectors } from "../services/garden/gardenSlice";

export const VeggiesTabScreen = ({
  navigation,
}: VeggiesTabScreenProps<"VeggiesTabScreen">) => {
  const dispatch = useAppDispatch();
  const gardens = useAppSelector(gardenSelectors.selectGardens);
  console.log(gardens[0]);

  return (
    <View style={styles.container}>
      <Button title="test" onPress={() => dispatch(gardenActions.test())} />
      <Text>{gardens[0].test && gardens[0].test}</Text>
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
