import React from "react";
import { StyleSheet } from "react-native";
import { VeggiesTabScreenProps } from "../types";
import { View } from "../components/Themed";
import { useAppSelector } from "../store";
import { veggieInfoSelectors } from "../services/veggieInfo/veggieInfoSlice";
import { VeggieInfoList } from "../components/VeggieInfoList";

export const VeggiesTabScreen = ({
  navigation,
}: VeggiesTabScreenProps<"VeggiesTabScreen">) => {
  const veggieInfos = useAppSelector(veggieInfoSelectors.selectVeggieInfos);

  return (
    <View style={styles.container}>
      <VeggieInfoList
        veggieInfos={veggieInfos}
        navigationHandler={(veggieInfo) =>
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
