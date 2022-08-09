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
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [filteredLogs, setFilteredLogs] = useState<VeggieLogNormalised[]>([]);
  // const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const showFilteredList = () => {
    setIsFiltered(true);
  };

  //****Complete this function */
  const filterLogs = (arr: VeggieLogNormalised[]) => {
    setFilteredLogs(arr);
  };

  const clearFilters = () => {
    setIsFiltered(false);
    filterLogs(globalLogs);
  };

  const con = () => {
    console.log("isFiltered", isFiltered);
    console.log("filteredLogs", filteredLogs);
    console.log("globalLogs", globalLogs);
  };

  // const filterByDate = () => {
  //   const logsToFilter = [...globalLogs];
  //   const filteredList = logsToFilter.filter(
  //     (log) => log.date === 1652054400000
  //   );
  //   setFilteredLogs(filteredList);
  // };

  // const FilterByPhotos = () => {
  //   const logsToFilter = [...globalLogs];
  //   const filteredList = logsToFilter.filter(
  //     (log) => log.photos.entities.length > 0
  //   );
  //   setFilteredLogs(filteredList);
  // };

  return (
    <View style={styles.container}>
      <Button title="con" onPress={con} />
      <View style={styles.filter}>
        <FilterModal
          isFiltered={isFiltered}
          showFilteredList={showFilteredList}
          filterLogs={filterLogs}
          clearFilters={clearFilters}
        />
      </View>
      {isFiltered ? (
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
