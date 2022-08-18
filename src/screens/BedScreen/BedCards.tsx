import { FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

import { CustomCard } from "../../components/CustomCard/CustomCard";
import { View } from "../../components/Themed";
import { bedSelectors } from "../../features/bed/bed.slice";
import { gardenSelectors } from "../../features/garden/garden.slice";
import { GardenScreenProps } from "../../navigation/navigation.types";
import { useAppSelector } from "../../store";

type Props = {
  selectedGardenId: string;
  navigation: GardenScreenProps<"BedsScreen">["navigation"];
};

export type LocationObj = {
  gardenTitle: string;
  bedTitle: string;
} | null;

export const BedCards = ({ selectedGardenId, navigation }: Props) => {
  const garden = useAppSelector((state) =>
    gardenSelectors.selectById(state, selectedGardenId)
  );
  const beds = useAppSelector((state) =>
    bedSelectors.selectByGarden(state, selectedGardenId)
  );

  return (
    <View style={styles.screenContainer}>
      <Text h1 style={styles.title}>
        {garden?.name}
      </Text>
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          numColumns={2}
          data={beds}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CustomCard
              title={item.name}
              selectedBedId={item.id}
              locationTitles={{
                gardenTitle: garden!.name,
                bedTitle: item.name,
              }}
              navigation={navigation}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: { flex: 1 },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  list: { maxWidth: 400 },

  title: {
    textTransform: "uppercase",
    textAlign: "center",
  },
});
