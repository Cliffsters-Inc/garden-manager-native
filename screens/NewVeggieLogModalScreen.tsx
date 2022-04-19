import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { GardenTabScreenProps } from "../types";

export const NewVeggieLogModalScreen = ({
  navigation,
  route,
}: GardenTabScreenProps<"VeggieScreen">) => {
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
