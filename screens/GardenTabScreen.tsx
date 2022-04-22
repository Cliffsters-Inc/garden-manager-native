import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { GardenTabScreenProps } from "../types";
import { useState } from "react";
import { GardenCards } from "../components/GardenCards";
import { BottomSheetForm } from "../components/shared/BottomSheetForm";
import { AddCardButton } from "../components/shared/AddCardButton";

export const GardenTabScreen = ({
  navigation,
  route,
}: GardenTabScreenProps<"GardenTabScreen">) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const areaTitle = "garden";

  return (
    <View style={styles.container}>
      <GardenCards navigation={navigation} route={route} />
      <AddCardButton setIsVisible={setIsVisible} areaTitle={areaTitle} />
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
