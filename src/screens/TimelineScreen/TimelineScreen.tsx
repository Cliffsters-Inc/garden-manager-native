/* eslint-disable import/namespace */
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import { View } from "../../components/Themed";
import { VeggieLogNormalised } from "../../features/entity.types";
import { logSelectors } from "../../features/log/log.slice";
import { TimelineScreenProps } from "../../navigation/navigation.types";
import { useAppSelector } from "../../store";
import { FilterModal } from "./FilterModal";
import { TimelineElement } from "./TimelineElement";

export const TimelineScreen = ({
  navigation,
}: TimelineScreenProps<"TimelineScreen">) => {
  const globalLogs = useAppSelector(logSelectors.selectAll);
  const [isTimelineFiltered, setIsTimelineFiltered] = useState<boolean>(false);
  const [filteredLogs, setFilteredLogs] = useState<VeggieLogNormalised[]>([]);

  useEffect(() => {
    if (filteredLogs.length === 0) {
      setIsTimelineFiltered(false);
      console.log("list is empty");
    } else {
      setIsTimelineFiltered(true);
      console.log("occupied list");
    }
  });

  const con = () => {
    console.log("isFiltered", isTimelineFiltered);
    console.log("filteredLogs", filteredLogs);
    // console.log("globalLogs", globalLogs);
  };

  return (
    <View style={styles.container}>
      <Button title="con" onPress={con} />
      <View style={styles.filter}>
        <FilterModal
          isTimelineFiltered={isTimelineFiltered}
          setIsTimelineFiltered={setIsTimelineFiltered}
          filteredLogs={filteredLogs}
          setFilteredLogs={setFilteredLogs}
        />
      </View>
      {isTimelineFiltered ? (
        <TimelineElement dataToMap={filteredLogs} />
      ) : (
        <TimelineElement dataToMap={globalLogs} />
      )}
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
