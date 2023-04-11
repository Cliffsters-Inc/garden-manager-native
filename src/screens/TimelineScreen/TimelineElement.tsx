import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { format } from "date-fns";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Timeline from "react-native-timeline-flatlist";

import { Text, View } from "../../components/Themed";
import { VeggieLogNormalised } from "../../features/entity.types";
import { logSelectors } from "../../features/log/log.slice";
import { useAppSelector } from "../../store";

export const TimelineElement = () => {
  const globalLogs = useAppSelector(logSelectors.selectAll);
  const activeFilter = useAppSelector((state) => state.filters.activeFilter);
  const filteredLogs = useAppSelector((state) => state.filters.filteredLogs);
  const logsToMap = activeFilter ? filteredLogs : globalLogs;
  const [showAllText, setShowAllText] = useState<{ [key: string]: boolean }>(
    {}
  );
  // console.log("**********logsToMap************", logsToMap);
  const assignIcon = (iconName: string) => {
    switch (iconName) {
      case "pests":
        return <Ionicons name="ios-bug-outline" size={20} color="#FF5A33" />;
      case "disease":
        return <FontAwesome5 name="virus" size={20} color="#633c15" />;
      case "sowed":
        return (
          <MaterialCommunityIcons
            name="seed-outline"
            size={20}
            color="#B4CF66"
          />
        );
      case "seedling":
        return <FontAwesome5 name="seedling" size={20} color="#44803F" />;
      case "generic":
        return <FontAwesome name="circle-o" size={20} color="black" />;
      default:
        return <FontAwesome name="circle-o" size={20} color="black" />;
    }
  };

  const createDescription = (log: VeggieLogNormalised, i: string) => {
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
          {log.notes}
        </Text>
      </Pressable>
    );
  };

  const timelineData = logsToMap?.map((log, i: number) => {
    const logTime = format(new Date(log.date), "d MMM yy");
    const logDescription = createDescription(log, i.toString());
    const hasTag = log.payloadTags.length > 0;
    const logIcon = hasTag
      ? assignIcon(log.payloadTags[0]!.tagLabel)
      : assignIcon("generic");

    return {
      time: logTime,
      description: logDescription,
      icon: logIcon,
    };
  });

  const hasLogs = logsToMap.length > 0;
  return hasLogs ? (
    <View style={styles.container}>
      <Timeline
        data={timelineData}
        style={styles.list}
        innerCircle="element"
        circleSize={20}
        circleColor="white"
        timeStyle={styles.time}
        timeContainerStyle={styles.timeContainer}
        descriptionStyle={styles.description}
        detailContainerStyle={styles.detailContainer}
      />
    </View>
  ) : (
    <View>
      <Text>No Logs match selected filters.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
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
