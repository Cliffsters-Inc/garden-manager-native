import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";

import { Text, View } from "../../components/Themed";

export const RangeSelector: React.FC<{
  name: string;
  handlePress: () => void;
  list: JSX.Element;
}> = ({ name, handlePress, list }) => (
  <>
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Text style={styles.text}>{name}</Text>
      </Pressable>
      <View style={styles.list}>{list}</View>
      <AntDesign name="right" size={24} color="black" />
    </View>
    <Divider color="black" />
  </>
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  text: {
    fontSize: 20,
  },
  list: {
    display: "flex",
    marginRight: "auto",
    // width: "100%",
    backgroundColor: "red",
  },
});
