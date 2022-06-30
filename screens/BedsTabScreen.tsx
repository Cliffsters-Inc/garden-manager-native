import { StyleSheet } from "react-native";
import { BedCards } from "../components/BedCards";
import { ActionButton } from "../components/shared/ActionButton";
import { View } from "../components/Themed";
import { GardenTabScreenProps } from "../types";

export const BedsTabScreen = ({
  navigation,
  route,
}: GardenTabScreenProps<"BedsTabScreen">) => {
  const { selectedGardenId } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.cards}>
        <BedCards selectedGardenId={selectedGardenId} navigation={navigation} />
      </View>

      <ActionButton
        onPress={() =>
          navigation.navigate("CreateCardModal", { selectedGardenId })
        }
        text="Add bed"
      />
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
});
