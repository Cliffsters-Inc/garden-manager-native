import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { View } from "../Themed";
import { ActionButton } from "./ActionButton";

type props = {
  routeName: string;
  selectedGardenId: string;
};

export const AddCardButton: FC<props> = ({ routeName, selectedGardenId }) => {
  const navigation = useNavigation();
  const areaTitle = routeName === "GardenTabScreen" ? "garden" : "bed";
  return (
    <View>
      <ActionButton
        onPress={() =>
          navigation.navigate("CreateCardModal", {
            areaTitle,
            routeName,
            selectedGardenId,
          })
        }
        text={`Add ${areaTitle}`}
      />
    </View>
  );
};
