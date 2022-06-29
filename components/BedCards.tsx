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
};

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
              onCardPress={() =>
                navigation.navigate("BedScreen", {
                  selectedBedId: item.id,
                })
              }
              onOptionsPress={() =>
                navigation.navigate("CardOptionsModal", {
                  onRenamePress: () =>
                    navigation.navigate("RenameCardModal", {
                      selectedBedId: item.id,
                    }),
                  onDeletePress: () =>
                    navigation.navigate("DeleteConfirmationModal", {
                      selectedBedId: item.id,
                    }),
                })
              }
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
