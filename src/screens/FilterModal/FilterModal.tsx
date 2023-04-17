import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";

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
    console.log("logsByDate", logsByDate);
    console.log("logsWithPic", logsWithPic);
    console.log("logByLocation", logsByLocation);
    // dispatch(switchActiveFilter());
    console.log("logsByTag", logsByTag);
    // console.log("filterByPic", filterByPic);
    console.log("filteredLogs", filteredLogIds);
    console.log("activeFilter", activeFilter);
  };

  return (
    <View>
      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Button title="con" onPress={con} /> */}
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
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={filter}
            >
              <Text style={styles.textStyle}>Accept Filters</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: 400,
    marginBottom: 100,
    // backgroundColor: "blue",
  },
  modalView: {
    height: "50%",
    width: "90%",
    margin: 20,
    // backgroundColor: "red",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginTop: 50,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
