import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";

import { Text, View } from "../../components/Themed";

export const RangeSelector: React.FC<{
  name: string;
  handlePress: () => void;
  list: JSX.Element;
}> = ({ name, handlePress, list }) => (
  <View style={styles.container}>
    <Pressable onPress={handlePress}>
      <Text style={styles.text}>{name}</Text>
    </Pressable>
    <View style={{ maxWidth: 210 }}>{list}</View>
    <AntDesign
      name="right"
      size={24}
      color="black"
      style={{ marginLeft: "auto" }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 8,
    // marginTop: 1,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 20,
  },
});
