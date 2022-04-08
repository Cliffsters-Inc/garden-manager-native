import { NativeStackScreenProps } from "@react-navigation/native-stack";
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
    <View>
      <View>
        <AddBedCard selectedGardenId={id} />
      </View>
      <View>
        <BedCards selectedGardenId={id} />
      </View>
    </View>
  );
};
