import { useState } from "react";
import { StyleSheet } from "react-native";
import { AddBedButton } from "../components/beds/AddBedButton";
import { BedCards } from "../components/beds/BedCards";
import { BottomSheetForm } from "../components/shared/BottomSheetForm";
import { View } from "../components/Themed";
import { GardenTabScreenProps } from "../types";

export const BedsTabScreen = ({
  navigation,
  route,
}: GardenTabScreenProps<"BedsTabScreen">) => {
  const { gardenId } = route.params;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const areaTitle = "bed";

  return (
    <View style={styles.container}>
      <BedCards selectedGardenId={gardenId} navigation={navigation} />
      <AddBedButton selectedGardenId={gardenId} />
      <BottomSheetForm
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        areaTitle={areaTitle}
        selectedGardenId={gardenId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
});
