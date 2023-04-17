import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";

import { Text, View } from "../../components/Themed";

export const SwitchSelector: React.FC<{
  name: string;
  handlePress: () => void;
  tickCondition: boolean;
}> = ({ name, handlePress, tickCondition }) => (
  <>
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Text style={styles.text}>{name}</Text>
      </Pressable>
      <View style={styles.tick}>
        {!tickCondition && (
          <FontAwesome5 name="check" size={24} color="green" />
        )}
      </View>
    </View>
    <Divider color="black" />
  </>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
  },
  text: {
    fontSize: 20,
  },
  tick: {
    marginLeft: "auto",
    justifyContent: "flex-end",
  },
});
