import React from "react";
import { StyleSheet } from "react-native";
import { VeggiesTabScreenProps } from "../types";
import { View } from "../components/Themed";
import { VeggieList } from "../components/VeggieList";
import { VeggieInfo } from "../services/types";
import { useAppSelector } from "../store";
import { veggieInfoSelectors } from "../services/veggieInfo/veggieInfoSlice";

export const VeggiesTabScreen = ({
  navigation,
}: VeggiesTabScreenProps<"VeggiesTabScreen">) => {
  const veggieInfos = useAppSelector(veggieInfoSelectors.selectVeggieInfos);

  return (
    <View style={styles.container}>
      <VeggieList
        veggies={veggieInfos}
        navigationHandler={(veggieInfo: VeggieInfo) =>
          navigation.navigate("VeggieInfoScreen", {
            title: veggieInfo.name,
            veggieInfo: veggieInfo,
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
