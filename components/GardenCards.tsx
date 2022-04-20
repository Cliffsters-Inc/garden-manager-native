import React from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { Card, Divider } from "react-native-elements";
import { gardenSelectors } from "../services/garden/gardenSlice";
import { useAppSelector } from "../store";
import { GardenTabScreenProps } from "../types";
import { View } from "./Themed";
import { Entypo } from "@expo/vector-icons";

export const GardenCards = ({
  navigation,
  route,
}: GardenTabScreenProps<"GardenTabScreen">) => {
  const gardens = useAppSelector(gardenSelectors.selectGardens);

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={gardens}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("BedsTabScreen", {
                gardenId: item.id,
              })
            }
          >
            <Card containerStyle={styles.card}>
              <Card.Title>{item.name}</Card.Title>
              <Divider />
              <Pressable
                onPress={() =>
                  navigation.navigate("CardOptionsModal", {
                    selectedGardenId: item.id,
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
  card: {
    minHeight: 100,
    minWidth: 150,
    borderWidth: 1,
  },
});
