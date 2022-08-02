import { StyleSheet } from "react-native";

import { ActionButton } from "../../components/ActionButton";
import { View } from "../../components/Themed";
import { GardenScreenProps } from "../../navigation/navigation.types";
import { GardenCards } from "./GardenCards";

export const GardenScreen = ({
  navigation,
  route,
}: GardenScreenProps<"GardenScreen">) => {
  return (
    <View style={styles.container}>
      <GardenCards navigation={navigation} />

      <ActionButton
        onPress={() => navigation.navigate("CreateCardModal")}
        text="Add garden"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
