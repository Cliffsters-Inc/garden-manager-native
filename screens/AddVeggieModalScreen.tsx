import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { VeggieList } from "../components/VeggieList";
import { mockData } from "../services/mockData";
import { VeggieInfo } from "../services/types";

export const AddVeggieModalScreen = () => {
  const { veggieInfos } = mockData;
  return (
    <View style={styles.container}>
      <VeggieList
        veggies={veggieInfos}
        addHandler={() => console.log("TODO add handler")}
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
