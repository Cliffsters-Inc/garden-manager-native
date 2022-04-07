import { StyleSheet } from "react-native";
import { SettingsTabScreenProps } from "../types";
import { View } from "../components/Themed";
import { DevSection } from "../components/DevSection";

export const SettingsTabScreen = ({
  navigation,
}: SettingsTabScreenProps<"SettingsTabScreen">) => {
  return (
    <View style={styles.container}>
      <DevSection />
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
