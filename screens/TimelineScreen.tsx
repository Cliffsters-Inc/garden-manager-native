import { format } from "date-fns";
import { StyleSheet } from "react-native";
import Timeline from "react-native-timeline-flatlist";
import { View } from "../components/Themed";
import { gardenSelectors } from "../services/garden/garden.selectors";
import { useAppSelector } from "../store";

export const TimelineScreen = () => {
  const logs = useAppSelector((state) =>
    gardenSelectors.selectGlobalLogs(state)
  );

  console.log("logs", logs);

  const data = logs?.map((value) => ({
    time: format(new Date(value.date), "d MMM yy"),
    title: value.id,
    description: value.notes,
  }));

  console.log(
    "data: ",
    logs.forEach((e) => {
      console.log("e: ", e.notes);
    })
  );

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
    width: "100%",
  },
  list: {
    flex: 1,
    marginTop: 20,
    width: "100%",
  },
});
