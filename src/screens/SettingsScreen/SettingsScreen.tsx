import { StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import { SettingsScreenProps } from "../../navigation/navigation.types";
import { DevSection } from "./DevSection";

export const SettingsScreen = ({
  navigation,
}: SettingsScreenProps<"SettingsScreen">) => {
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
