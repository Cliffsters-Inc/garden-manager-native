import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import { useAppDispatch, useAppSelector } from "../store";
import { RootStackScreenProps } from "../types";
import { veggieInfoSelectors } from "../services/veggieInfo/veggieInfoSlice";
import { VeggieInfoList } from "../components/VeggieInfoList";
import { veggieActions } from "../services/veggie/veggie.slice";

export const AddVeggieModalScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"AddVeggieModal">) => {
  const appDispatch = useAppDispatch();
  const { selectedBedId } = route.params;
  const veggieInfos = useAppSelector(veggieInfoSelectors.selectVeggieInfos);

  return (
    <View style={styles.container}>
      <VeggieInfoList
        veggieInfos={veggieInfos}
        addHandler={(veggieInfo) => {
          appDispatch(
            veggieActions.add({
              bed: selectedBedId,
              veggieInfo,
              logs: [],
            })
          );
          navigation.goBack();
        }}
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
