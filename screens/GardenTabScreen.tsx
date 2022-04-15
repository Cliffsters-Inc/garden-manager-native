import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { GardenTabScreenProps } from "../types";
import { AddGardenButton } from "../components/gardens/AddGardenButton";
import { useState } from "react";
import { FormBottomSheet } from "../components/shared/BottomSheetForm";
import { GardenCards } from "../components/gardens/GardenCards";

export const GardenTabScreen = ({
  navigation,
}: GardenTabScreenProps<"GardenTabScreen">) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <GardenCards navigation={navigation} />
      <AddGardenButton setIsVisible={setIsVisible} />
      <FormBottomSheet isVisible={isVisible} setIsVisible={setIsVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    flex: 5,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  bottomSheet: {
    flex: 1,
  },
});
