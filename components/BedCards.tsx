import { useRoute } from "@react-navigation/native";
import { FunctionComponent } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { gardenSelectors } from "../services/garden/garden.selectors";
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
  const gardens = useAppSelector(gardenSelectors.selectGardens);

  const route = useRoute();
  const routeName = route.name;

  const selectedGardenObject = gardens.find(
    (garden) => garden.id === selectedGardenId
  );

  const beds = selectedGardenObject?.beds;

  return (
    <View style={styles.container}>
      <Text h1 style={styles.title}>
        {selectedGardenObject?.name}
      </Text>
      <FlatList
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={beds}
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
