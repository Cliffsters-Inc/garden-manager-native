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
      <View>{list}</View>
      <AntDesign
        name="right"
        size={24}
        color="black"
        style={{ marginLeft: "auto" }}
      />
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
});
