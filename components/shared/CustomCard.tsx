import { Entypo } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { Card, Divider } from "react-native-elements";
import { View } from "../Themed";

type Props = {
  title: string;
  onCardPress: () => void;
  onOptionsPress: () => void;
};

export const CustomCard = ({ title, onCardPress, onOptionsPress }: Props) => (
  <Pressable onPress={onCardPress} style={styles.container}>
    <Card
      containerStyle={styles.cardContainer}
      wrapperStyle={styles.cardWrapper}
    >
      <Card.Title style={styles.title}>{title}</Card.Title>
      <Divider />
      <Pressable onPress={onOptionsPress}>
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
