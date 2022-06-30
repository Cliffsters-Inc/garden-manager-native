import { Entypo } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { Card, Divider } from "react-native-elements";
import { GardenTabScreenProps } from "../../types";
import { View } from "../Themed";

type Props = {
  title: string;
  navigation:
    | GardenTabScreenProps<"GardenTabScreen">["navigation"]
    | GardenTabScreenProps<"BedsTabScreen">["navigation"];
} & (
  | {
      selectedGardenId: string;
      selectedBedId?: never;
    }
  | {
      selectedGardenId?: never;
      selectedBedId: string;
    }
);

export const CustomCard = ({
  title,
  selectedGardenId,
  selectedBedId,
  navigation,
}: Props) => {
  return (
    <Pressable
      onPress={() => {
        selectedGardenId
          ? navigation.navigate("BedsTabScreen", { selectedGardenId })
          : selectedBedId &&
            navigation.navigate("BedScreen", { selectedBedId });
      }}
      style={styles.container}
    >
      <Card
        containerStyle={styles.cardContainer}
        wrapperStyle={styles.cardWrapper}
      >
        <Card.Title style={styles.title}>{title}</Card.Title>
        <Divider />
        <Pressable
          onPress={() =>
            selectedGardenId
              ? navigation.navigate("CardOptionsModal", { selectedGardenId })
              : selectedBedId &&
                navigation.navigate("CardOptionsModal", { selectedBedId })
          }
        >
          <View style={styles.options}>
            <Entypo
              testID={`custom-card-edit-btn-${title}`}
              name="dots-three-horizontal"
              size={24}
              color="black"
            />
          </View>
        </Pressable>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 / 2 },
  cardContainer: {
    padding: 0,
    flex: 1,
    borderRadius: 5,
  },
  cardWrapper: {
    height: 100,
    flex: 1,
    paddingVertical: 5,
  },
  title: {
    flex: 4,
    marginVertical: 20,
    textTransform: "capitalize",
  },
  options: {
    marginVertical: 1,
    alignItems: "flex-end",
    paddingRight: 10,
  },
});
