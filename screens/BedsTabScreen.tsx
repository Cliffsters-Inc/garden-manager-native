import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AddBedCard } from "../components/AddBedCard";
import { BedCards } from "../components/BedCards";
import { View } from "../components/Themed";
import { GardenTabParamList } from "../types";

export const BedsTabScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<GardenTabParamList, "BedsTabScreen">) => {
  return (
    <View>
      <View>
        <AddBedCard selectedGardenId={""} />
      </View>
      <View>
        <BedCards selectedGardenId={""} />
      </View>
    </View>
  );
};
