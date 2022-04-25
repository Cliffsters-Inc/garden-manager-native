import { Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { FunctionComponent } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { Card, Divider, Text } from "react-native-elements";
import { gardenSelectors } from "../services/garden/gardenSlice";
import { useAppSelector } from "../store";
import { GardenTabScreenProps } from "../types";
import { CustomCard } from "./shared/CustomCard";
import { View } from "./Themed";

type BedCardsProps = {
  selectedGardenId: string;
  navigation: GardenTabScreenProps<"GardenTabScreen">["navigation"];
};

export const BedCards: FunctionComponent<BedCardsProps> = ({
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
    width: "100%",
    padding: 15,
    marginTop: 50,
  },
  title: {
    textTransform: "uppercase",
  },
  card: {
    minHeight: 100,
    minWidth: 150,
    borderWidth: 1,
    marginTop: 40,
  },
});
