import { format } from "date-fns";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Timeline from "react-native-timeline-flatlist";

import { TagIconElement } from "../../components/Tags/TagIcon";
import { Text, View } from "../../components/Themed";
import { VeggieLogNormalised } from "../../features/entity.types";
import { logSelectors } from "../../features/log/log.slice";
import { useAppSelector } from "../../store";

export const TimelineElement = () => {
  const globalLogs = useAppSelector(logSelectors.selectAll);
  const activeFilter = useAppSelector((state) => state.filters.activeFilter);
  const filteredLogIds = useAppSelector(
    (state) => state.filters.filteredLogIds
  );
  const [showAllText, setShowAllText] = useState<{ [key: string]: boolean }>(
    {}
  );

  const filteredLogs: VeggieLogNormalised[] = useAppSelector((state) =>
    filteredLogIds ? logSelectors.selectByIds(state, filteredLogIds) : []
  );

  const timelineLogs = activeFilter ? filteredLogs : globalLogs;

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

  const entryData = timelineLogs?.map((log, i: number) => {
    const date = format(new Date(log.date), "d MMM yy");
    const text = createDescription(log, i.toString());

    const findFirstTag = () => {
      if (log.payloadTags.length > 0) {
        return log.payloadTags[0];
      } else {
        return {
          tagLabel: "default",
          tagColor: "#FFFFFF",
          tagIcon: "default",
        };
      }
    };
    const firstTag = findFirstTag();
    const iconColor = firstTag?.tagColor;
    const selectedIcon = firstTag?.tagIcon;
    const tag = TagIconElement({ iconColor, selectedIcon });

    return {
      time: date,
      description: text,
      icon: tag,
    };
  });

  const hasLogs = timelineLogs.length > 0;
  return hasLogs ? (
    <View style={styles.container}>
      <Timeline
        data={entryData}
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
    <View style={styles.container}>
      <Text style={styles.warning}>No Logs match selected filters.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  list: {
    width: "100%",
    marginTop: 20,
    marginLeft: 25,
  },
  timeContainer: {
    minWidth: 80,
  },
  time: {
    textAlign: "center",
    backgroundColor: "#ff9797",
    color: "white",
    fontWeight: "bold",
    padding: 6,
    borderRadius: 13,
  },
  detailContainer: {
    backgroundColor: "#BBDAFF",
    marginVertical: 10,
    maxWidth: 180,
    minHeight: 40,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 20,
  },
  description: {
    textAlign: "center",
    padding: 5,
  },
  warning: {
    textAlign: "center",
    fontSize: 20,
  },
});
