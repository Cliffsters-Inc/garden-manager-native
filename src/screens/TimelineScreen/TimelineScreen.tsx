/* eslint-disable import/namespace */
import { useState } from "react";
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
  const [filteredLogs, setFilteredLogs] = useState<VeggieLogNormalised[]>([
    {
      id: "zv8RCeafO9OFQELDRcC",
      date: 1652054400000,
      notes: "starting to sprout\n\nyey",
      photos: { entities: [], loading: "pending" },
      veggie: "testVeggie",
      payloadTags: [
        {
          tagLabel: "seedling",
          tagColor: "#44803F",
          tagIcon: "seedling",
        },
      ],
    },
  ]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const clearFilters = () => {
    setIsTimelineFiltered(false);
    setSelectedFilters([]);
    setFilteredLogs(globalLogs);
  };

  const con = () => {
    console.log("isFiltered", isTimelineFiltered);
    console.log("selectedFilters", selectedFilters);
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
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          clearFilters={clearFilters}
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
