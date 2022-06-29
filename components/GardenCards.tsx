import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gardenSelectors } from "../services/garden/garden.slice";
import { useAppSelector } from "../store";
import { GardenTabScreenProps } from "../types";
import { CustomCard } from "./shared/CustomCard";

export const GardenCards = ({
  navigation,
}: {
  navigation: GardenTabScreenProps<"GardenTabScreen">["navigation"];
}) => {
  const gardens = useAppSelector(gardenSelectors.selectAll);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={{ alignItems: "stretch" }}
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={gardens}
        renderItem={({ item }) => (
          <CustomCard
            title={item.name}
            onCardPress={() =>
              navigation.navigate("BedsTabScreen", {
                selectedGardenId: item.id,
              })
            }
            onOptionsPress={() =>
              navigation.navigate("CardOptionsModal", {
                onRenamePress: () =>
                  navigation.navigate("RenameCardModal", {
                    selectedGardenId: item.id,
                  }),
                onDeletePress: () =>
                  navigation.navigate("DeleteConfirmationModal", {
                    selectedGardenId: item.id,
                  }),
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  list: { maxWidth: 400 },
});
