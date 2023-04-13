import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import { View } from "../../components/Themed";
import { TimelineScreenProps } from "../../navigation/navigation.types";
import { FilterModal } from "./FilterModal";
import { TimelineElement } from "./TimelineElement";

export const TimelineScreen = ({
  navigation,
}: TimelineScreenProps<"TimelineScreen">) => {
  const con = () => {
    // console.log("globalLogs", globalLogs);
    // console.log("filteredLogs", filteredLogs);
  };

  return (
    <View style={styles.container}>
      <Button title="con" onPress={con} />
      <View style={styles.filter}>
        <FilterModal />
      </View>
      <TimelineElement />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filter: {
    height: 100,
    // backgroundColor: "red",
  },
});
