import { StyleSheet } from "react-native";

import { ActionButton } from "../../components/ActionButton";
import { View } from "../../components/Themed";
import { GardenScreenProps } from "../../navigation/navigation.types";
import { BedCards } from "./BedCards";

export const BedsScreen = ({
  navigation,
  route,
}: GardenScreenProps<"BedsScreen">) => {
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
