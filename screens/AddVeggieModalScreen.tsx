import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { VeggieList } from "../components/VeggieList";
import { useAppDispatch, useAppSelector } from "../store";
import { RootStackScreenProps } from "../types";
import { gardenActions } from "../services/garden/gardenSlice";
import { veggieInfoSelectors } from "../services/veggieInfo/veggieInfoSlice";

export const AddVeggieModalScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"AddVeggieModal">) => {
  const appDispatch = useAppDispatch();
  const { gardenId, bedId } = route.params;
  const veggieInfos = useAppSelector(veggieInfoSelectors.selectVeggieInfos);

  return (
    <View style={styles.container}>
      <VeggieList
        veggies={veggieInfos}
        addHandler={(veggieInfo) => {
          appDispatch(gardenActions.addVeggie({ gardenId, bedId, veggieInfo }));
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
