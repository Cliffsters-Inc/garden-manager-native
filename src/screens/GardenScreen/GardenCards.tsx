import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomCard } from "../../components/CustomCard/CustomCard";
import { gardenSelectors } from "../../features/garden/garden.slice";
import { GardenScreenProps } from "../../navigation/navigation.types";
import { useAppSelector } from "../../store";

export const GardenCards = ({
  navigation,
}: {
  navigation: GardenScreenProps<"GardenScreen">["navigation"];
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
            selectedGardenId={item.id}
            navigation={navigation}
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
