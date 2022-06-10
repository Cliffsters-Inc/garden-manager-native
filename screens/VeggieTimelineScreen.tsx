import { format } from "date-fns";
import { StyleSheet } from "react-native";
import Timeline from "react-native-timeline-flatlist";
import { Text, View } from "../components/Themed";
import { GardenTabScreenProps } from "../types";

export const VeggieTimelineScreen = ({
  route,
}: GardenTabScreenProps<"VeggieTimelineScreen">) => {
  const { veggieLogs } = route.params;

  const data = veggieLogs?.map((value) => ({
    time: format(new Date(value.date), "d MMM yy"),
    title: value.id,
    description: value.notes,
  }));

  return (
    <View style={styles.container}>
      <Timeline data={data} style={styles.list} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
    backgroundColor: "white",
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});
