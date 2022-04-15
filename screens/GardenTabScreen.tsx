import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { GardenTabScreenProps } from "../types";
import { GardenCards } from "../components/GardenCards";
import { AddGardenButton } from "../components/AddGardenButton";
import { useState } from "react";
import { FormBottomSheet } from "../components/BottomSheetForm";

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
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 50,
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
