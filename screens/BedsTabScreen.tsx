import { useState } from "react";
import { StyleSheet } from "react-native";
import { BedCards } from "../components/beds/BedCards";
import { AddCardButton } from "../components/shared/AddCardButton";
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
      <AddCardButton setIsVisible={setIsVisible} areaTitle={areaTitle} />
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
