import { useRoute } from "@react-navigation/native";
import { FunctionComponent } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { bedSelectors } from "../services/bed/bed.slice";
import { gardenSelectors } from "../services/garden/garden.slice";
import { useAppSelector } from "../store";
import { GardenTabScreenProps } from "../types";
import { CustomCard } from "./shared/CustomCard";
import { View } from "./Themed";

type props = {
  selectedGardenId: string;
  navigation: GardenTabScreenProps<"GardenTabScreen">["navigation"];
};

export const BedCards: FunctionComponent<props> = ({
  selectedGardenId,
  navigation,
}) => {
  const garden = useAppSelector((state) =>
    gardenSelectors.selectById(state, selectedGardenId)
  );
  const beds = useAppSelector(
    (state) => garden && bedSelectors.selectByIds(state, garden.beds)
  );

  const route = useRoute();
  const routeName = route.name;

  return (
    <View style={styles.container}>
      <Text h1 style={styles.title}>
        {garden?.name}
      </Text>
      <FlatList
        numColumns={2}
        data={beds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CustomCard
            title={item.name}
            selectedGardenId={selectedGardenId}
            selectedBedId={item.id}
            navigation={navigation}
            routeName={routeName}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginTop: 50,
  },
  title: {
    textTransform: "uppercase",
  },
});
