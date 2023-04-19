import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import { Text, View } from "../../components/Themed";
import {
  filterLogs,
  resetFilters,
  switchActiveFilter,
} from "../../features/Filters/filter.slice";
import { logSelectors } from "../../features/log/log.slice";
import { useAppDispatch, useAppSelector } from "../../store";
import { DateFilter, DateRangeObj } from "../TimelineScreen/DateFilter";
import {
  LocationFilter,
  SelectedLocationsObj,
} from "../TimelineScreen/LocationFilter";
import { PhotoFilter } from "../TimelineScreen/PhotoFilter";
import { ResetFilters } from "../TimelineScreen/ResetFilters";
import { TagsFilterModal } from "../TimelineScreen/TagsFilterModal";

export const FilterModal: React.FC<{
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ modalVisible, setModalVisible }) => {
  const globalLogs = useAppSelector(logSelectors.selectAll);
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector((state) => state.filters.activeFilter);
  const logsByTag = useAppSelector((state) => state.filters.logsByTag);
  const logsByLocation = useAppSelector(
    (state) => state.filters.logsByLocation
  );
  const filterByDate = useAppSelector((state) => state.filters.filterByDate);
  const filterByPic = useAppSelector((state) => state.filters.filterByPic);
  const logsByDate = useAppSelector((state) => state.filters.logsBydate);
  const logsWithPic = useAppSelector((state) => state.filters.logsWithPics);
  const filteredLogIds = useAppSelector(
    (state) => state.filters.filteredLogIds
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedLocations, setSelectedlocations] =
    useState<SelectedLocationsObj>({
      garden: null,
      bed: null,
    });
  const [dateRange, setDateRange] = useState<DateRangeObj>({
    startingDate: null,
    endingDate: null,
  });

  useEffect(() => {
    dispatch(switchActiveFilter());
    console.log("switch active filter");
  }, [logsByTag, logsByLocation, logsByDate, filterByPic]);

  const clearFilters = () => {
    dispatch(resetFilters());
    setSelectedTags([]);
    setDateRange({
      startingDate: null,
      endingDate: null,
    });
    setSelectedlocations({
      garden: null,
      bed: null,
    });
  };

  const filter = () => {
    console.log("filtering...");
    dispatch(filterLogs());
    setModalVisible(false);
  };

  const con = () => {
    // console.log("logsByDate", logsByDate);
    console.log("logsWithPic", logsWithPic);
    console.log("logByLocation", logsByLocation);
    // dispatch(switchActiveFilter());
    // console.log("logsByTag", logsByTag);
    // console.log("filterByPic", filterByPic);
    // console.log("filteredLogs", filteredLogIds);
    console.log("activeFilter", activeFilter);
  };

  return (
    <View>
      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Button title="con" onPress={con} />
            <ResetFilters
              clearFilters={clearFilters}
              activeFilter={activeFilter}
            />
            <TagsFilterModal
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
            <DateFilter dateRange={dateRange} setDateRange={setDateRange} />
            <LocationFilter
              selectedLocations={selectedLocations}
              setSelectedLocations={setSelectedlocations}
            />
            <PhotoFilter />
            <View style={styles.buttonContainer}>
              <Pressable style={styles.button} onPress={filter}>
                <Text style={styles.buttonText}>Accept Filters</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 100,
  },
  modalView: {
    height: 400,
    width: 350,
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    width: 150,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 80,
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
