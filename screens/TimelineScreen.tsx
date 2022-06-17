import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { format } from "date-fns";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Timeline from "react-native-timeline-flatlist";
import { Text, View } from "../components/Themed";
import { gardenSelectors } from "../services/garden/garden.selectors";
import { VeggieLog } from "../services/types";
import { useAppSelector } from "../store";

export const TimelineScreen = () => {
  const [showAllText, setShowAllText] = useState<{ [key: string]: boolean }>(
    {}
  );

  const assignTag = (tagName: string) => {
    switch (tagName) {
      case "pests":
        return <Ionicons name="ios-bug-outline" size={20} color={"#FF5A33"} />;
      case "disease":
        return <FontAwesome5 name="virus" size={20} color={"#633c15"} />;
      case "sowed":
        return (
          <MaterialCommunityIcons
            name="seed-outline"
            size={20}
            color={"#B4CF66"}
          />
        );
      case "seedling":
        return <FontAwesome5 name="seedling" size={20} color="#44803F" />;
    }
  };

  const descriptionElement = (value: VeggieLog, i: string) => {
    const onPress = () => {
      setShowAllText((prev) => ({
        ...showAllText,
        [i]: !prev[i],
      }));
    };

    return (
      <Pressable onPress={onPress}>
        <Text
          style={styles.description}
          numberOfLines={showAllText[`${i}`] ? 0 : 4}
        >
          {value.notes}
        </Text>
      </Pressable>
    );
  };

  const logs = useAppSelector((state) =>
    gardenSelectors.selectGlobalLogs(state)
  );

  const timelineData = logs?.map((value, i: number) => ({
    time: format(new Date(value.date), "d MMM yy"),
    // title: i,
    description: descriptionElement(value, i.toString()),
    icon: assignTag(value.payloadTags[0].tagLabel),
    // lineColor: value.payloadTags[0].tagColor,
  }));

  return (
    <View style={styles.container}>
      <Timeline
        data={timelineData}
        style={styles.list}
        innerCircle={"element"}
        circleSize={20}
        circleColor={"white"}
        timeStyle={styles.time}
        timeContainerStyle={styles.timeContainer}
        descriptionStyle={styles.description}
        detailContainerStyle={styles.detailContainer}
        // separator={true}
        // columnFormat="two-column"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    marginLeft: 30,
  },
  list: {
    flex: 1,
    marginTop: 20,
    width: "100%",
  },
  timeContainer: {
    minWidth: 80,
  },
  time: {
    textAlign: "center",
    backgroundColor: "#ff9797",
    color: "white",
    padding: 6,
    borderRadius: 13,
  },
  detailContainer: {
    textAlign: "center",
    backgroundColor: "#BBDAFF",
    marginVertical: 10,
    maxWidth: 180,
    minHeight: 40,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
  },
  description: {
    textAlign: "center",
  },
});
