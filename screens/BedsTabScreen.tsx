import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { AddBedCard } from "../components/AddBedCard";
import { BedCards } from "../components/BedCards";
import { View } from "../components/Themed";
import { GardenTabParamList } from "../types";

export const BedsTabScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<GardenTabParamList, "BedsTabScreen">) => {
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <View>
        <AddBedCard selectedGardenId={id} />
      </View>
      <View>
        <BedCards selectedGardenId={id} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "50%",
  },
});
