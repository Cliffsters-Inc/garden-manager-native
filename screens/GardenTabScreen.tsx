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
      <View style={styles.cards}>
        <GardenCards navigation={navigation} route={route} />
      </View>
      <View style={styles.button}>
        <AddCardButton setIsVisible={setIsVisible} areaTitle={areaTitle} />
      </View>
      <View>
        <BottomSheetForm
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          areaTitle={areaTitle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cards: {
    flex: 5,
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
