import { StyleSheet } from "react-native";
import { AddBedButton } from "../components/AddBedButton";
import { BedCards } from "../components/BedCards";
import { View } from "../components/Themed";
import { GardenTabScreenProps } from "../types";

export const BedsTabScreen = ({
  navigation,
  route,
}: GardenTabScreenProps<"BedsTabScreen">) => {
  const { gardenId } = route.params;

  return (
    <View style={styles.container}>
      <BedCards selectedGardenId={gardenId} navigation={navigation} />
      <AddBedButton selectedGardenId={gardenId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
});
