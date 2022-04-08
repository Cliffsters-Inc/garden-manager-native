import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { GardenTabScreenProps } from "../types";
import { GardenCards } from "../components/GardenCards";
import { AddGardenCard } from "../components/AddGardenCard";
import { useState } from "react";

export const GardenTabScreen = ({
  navigation,
}: GardenTabScreenProps<"GardenTabScreen">) => {
  const [selectedGardenId, setSelectedGardenId] = useState<string>("");
  return (
    <View style={styles.container}>
      <View>
        <AddGardenCard />
      </View>
      <View>
        <GardenCards
          navigation={navigation}
          setSelectedGardenId={setSelectedGardenId}
          selectedGardenId={selectedGardenId}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "50%",
  },
});
