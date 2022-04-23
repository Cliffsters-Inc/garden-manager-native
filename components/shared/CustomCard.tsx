import { Entypo } from "@expo/vector-icons";
import { FunctionComponent } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Card, Divider } from "react-native-elements";
import { GardenTabScreenProps } from "../../types";
import { View } from "../Themed";

type props = {
  title: string;
  selectedGardenId: string;
  navigation: GardenTabScreenProps<"GardenTabScreen">["navigation"];
};

export const CustomCard: FunctionComponent<props> = ({
  navigation,
  ...props
}) => {
  const selectedGardenId = props.selectedGardenId;
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("BedsTabScreen", {
          selectedGardenId,
        })
      }
    >
      <Card wrapperStyle={styles.container} containerStyle={styles.outer}>
        <Card.Title style={styles.title}>{props.title}</Card.Title>
        <Divider style={{ marginTop: 5 }} />
        <Pressable
          onPress={() =>
            navigation.navigate("CardOptionsModal", {
              selectedGardenId,
            })
          }
        >
          <View style={styles.options}>
            <Entypo name="dots-three-horizontal" size={24} color="black" />
          </View>
        </Pressable>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  outer: {
    borderWidth: 1,
    padding: 0,
  },
  container: {
    flex: 1,
    minHeight: 100,
    minWidth: 150,
  },
  title: {
    flex: 4,
    paddingTop: 10,
    textTransform: "capitalize",
  },
  options: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 10,
  },
});
