import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { GardenTabScreenProps } from "../types";
import { AddGardenButton } from "../components/gardens/AddGardenButton";
import { useState } from "react";
import { GardenCards } from "../components/gardens/GardenCards";
import { BottomSheetForm } from "../components/shared/BottomSheetForm";

export const GardenTabScreen = ({
  navigation,
}: GardenTabScreenProps<"GardenTabScreen">) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const areaTitle = "garden";

  return (
    <View style={styles.container}>
      <GardenCards navigation={navigation} />
      <AddGardenButton setIsVisible={setIsVisible} />
      <BottomSheetForm
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        areaTitle={areaTitle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
