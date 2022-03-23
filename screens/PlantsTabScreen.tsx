import { StyleSheet } from "react-native";
import { RootTabScreenProps } from "../types";
import { Text, View } from "../components/Themed";

export const PlantsTabScreen = ({
  navigation,
}: RootTabScreenProps<"PlantsTab">) => {
  return <View style={styles.container}></View>;
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