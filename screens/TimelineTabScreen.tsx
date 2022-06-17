import { StyleSheet } from "react-native";
import { TimelineTabScreenProps } from "../types";
import { View } from "../components/Themed";
import { TimelineScreen } from "./TimelineScreen";

export const TimelineTabScreen = ({
  navigation,
}: TimelineTabScreenProps<"TimelineTabScreen">) => {
  return (
    <View style={styles.container}>
      <TimelineScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
