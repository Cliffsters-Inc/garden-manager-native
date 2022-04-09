import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { VeggieList } from "../components/VeggieList";
import { mockData } from "../services/mockData";
import { useAppDispatch } from "../store";
import { RootStackScreenProps } from "../types";
import { gardenActions } from "../services/garden/gardenSlice";

export const AddVeggieModalScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"AddVeggieModal">) => {
  const appDispatch = useAppDispatch();
  const { gardenId, bedId } = route.params;
  console.log("MODAL route params", route.params);

  const { veggieInfos } = mockData;
  return (
    <View style={styles.container}>
      <VeggieList
        veggies={veggieInfos}
        addHandler={(veggieInfoId) => {
          appDispatch(
            gardenActions.addVeggie({ gardenId, bedId, veggieInfoId })
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
