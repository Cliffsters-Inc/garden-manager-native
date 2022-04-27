import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { GardenTabScreenProps } from "../types";
import { useState } from "react";
import { GardenCards } from "../components/GardenCards";
import { AddCardButton } from "../components/shared/AddCardButton";

export const GardenTabScreen = ({
  navigation,
  route,
}: GardenTabScreenProps<"GardenTabScreen">) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const areaTitle = "garden";
  const routeName = route.name;

  return (
    <View style={styles.container}>
      <View style={styles.cards}>
        <GardenCards navigation={navigation} route={route} />
      </View>
      <View style={styles.button}>
        <AddCardButton routeName={routeName} />
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
