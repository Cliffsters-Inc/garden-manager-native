import { FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { bedSelectors } from "../services/bed/bed.slice";
import { gardenSelectors } from "../services/garden/garden.slice";
import { useAppSelector } from "../store";
import { GardenTabScreenProps } from "../types";
import { CustomCard } from "./shared/CustomCard";
import { View } from "./Themed";

type Props = {
  selectedGardenId: string;
  navigation: GardenTabScreenProps<"BedsTabScreen">["navigation"];
  route: GardenTabScreenProps<"BedsTabScreen">["route"];
};

export const BedCards = ({ selectedGardenId, navigation, route }: Props) => {
  const garden = useAppSelector((state) =>
    gardenSelectors.selectById(state, selectedGardenId)
  );
  const beds = useAppSelector((state) =>
    bedSelectors.selectByGarden(state, selectedGardenId)
  );

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
            routeName={route.name}
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
