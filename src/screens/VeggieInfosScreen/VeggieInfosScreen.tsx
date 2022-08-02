import React from "react";
import { StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import { VeggieInfoList } from "../../components/VeggieInfoList";
import { veggieInfoSelectors } from "../../features/veggieInfo/veggieInfoSlice";
import { VeggiesScreenProps } from "../../navigation/navigation.types";
import { useAppSelector } from "../../store";

export const VeggiesScreen = ({
  navigation,
}: VeggiesScreenProps<"VeggiesScreen">) => {
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
