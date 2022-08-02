import { StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import { VeggieInfoList } from "../../components/VeggieInfoList";
import { veggieActions } from "../../features/veggie/veggie.slice";
import { veggieInfoSelectors } from "../../features/veggieInfo/veggieInfoSlice";
import { RootStackScreenProps } from "../../navigation/navigation.types";
import { useAppDispatch, useAppSelector } from "../../store";

export const AddVeggieModal = ({
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
