import { Entypo } from "@expo/vector-icons";
import { FunctionComponent } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { Card, Divider, Text } from "react-native-elements";
import { gardenSelectors } from "../services/garden/gardenSlice";
import { useAppSelector } from "../store";
import { GardenTabScreenProps } from "../types";
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
          <Pressable
            onPress={() =>
              navigation.navigate("BedScreen", {
                bedId: item.id,
                gardenId: selectedGardenId,
              })
            }
          >
            <Card containerStyle={styles.card}>
              <Card.Title>{item.name}</Card.Title>
              <Divider />
              <Pressable
                onPress={() =>
                  navigation.navigate("CardOptionsModal", {
                    bedId: item.id,
                    selectedGardenId,
                  })
                }
              >
                <Entypo name="dots-three-horizontal" size={24} color="black" />
              </Pressable>
            </Card>
          </Pressable>
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
