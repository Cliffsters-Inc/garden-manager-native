import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { StyleSheet } from "react-native";
import Timeline from "react-native-timeline-flatlist";
import { View } from "../components/Themed";
import { FindIcon } from "../components/TimelineIcon";
import { gardenSelectors } from "../services/garden/garden.selectors";
import { useAppSelector } from "../store";

export const TimelineScreen = () => {
  const logs = useAppSelector((state) =>
    gardenSelectors.selectGlobalLogs(state)
  );

  console.log("logs", logs);
  logs.forEach((log: any) => {
    console.log(log.payloadTags[0].tagColor);
  });

  const assignTag = (
    tagName: string | undefined,
    tagColor: string | undefined
  ) => {
    switch (tagName) {
      case "pests":
        return <Ionicons name="ios-bug-outline" size={20} color={tagColor} />;
      case "disease":
        return <FontAwesome5 name="virus" size={20} color={tagColor} />;
    }
  };

  const data = logs?.map((value) => ({
    time: format(new Date(value.date), "d MMM yy"),
    // title: value.id,
    description: value.notes,
    icon: assignTag(
      //*********changing below from value.payloadTags[0].tagLabel caused current error*********
      value.payloadTags[0].tagLabel,
      value.payloadTags[0].tagColor
    ),
  }));

  return (
    <View style={styles.container}>
      <Timeline
        data={data}
        style={styles.list}
        innerCircle={"icon"}
        circleColor={"white"}
        descriptionStyle={styles.description}
        detailContainerStyle={{
          backgroundColor: "rgba(126, 208, 252, 0.5)",
          maxWidth: 180,
          minHeight: 40,
          borderColor: "black",
          borderStyle: "solid",
          borderWidth: 2,
          borderRadius: 20,
        }}
        // separator={false}
        // columnFormat="two-column"
      />
      <FindIcon selectedIcon={"pest"} />
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
  description: {
    backgroundColor: "rgba(126, 208, 252, 0.5)",
    // maxWidth: 180,
    // minHeight: 40,
    // borderColor: "black",
    // borderStyle: "solid",
    // borderWidth: 2,
    // borderRadius: 20,
    padding: 5,
  },
});
