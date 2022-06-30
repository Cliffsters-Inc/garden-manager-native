import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { GardenTabScreenProps } from "../types";
import { GardenCards } from "../components/GardenCards";
import { ActionButton } from "../components/shared/ActionButton";

export const GardenTabScreen = ({
  navigation,
  route,
}: GardenTabScreenProps<"GardenTabScreen">) => {
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
