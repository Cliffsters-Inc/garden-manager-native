import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import {
  filterLogs,
  resetFilters,
  switchActiveFilter,
} from "../../features/Filters/filter.slice";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  DateFilter,
  DateRangeObj,
} from "../TimelineScreen/DateFilter/DateFilter";
import {
  LocationFilter,
  SelectedLocationsObj,
} from "../TimelineScreen/LocationFilter";
import { PhotoFilter } from "../TimelineScreen/PhotoFilter";
import { ResetFilters } from "../TimelineScreen/ResetFilters";
import { TagsFilter } from "../TimelineScreen/TagsFilter";

export const FilterModal: React.FC<{
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ modalVisible, setModalVisible }) => {
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector((state) => state.filters.activeFilter);
  const logsByTag = useAppSelector((state) => state.filters.logsByTag);
  const filteringByPic = useAppSelector((state) => state.filters.logsWithPics);
  const logsByDate = useAppSelector((state) => state.filters.logsBydate);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const logsByLocation = useAppSelector(
    (state) => state.filters.logsByLocation
  );
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
  }, [logsByTag, logsByLocation, logsByDate, filteringByPic]);

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
    dispatch(filterLogs());
    setModalVisible(false);
  };

  return (
    <View>
      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <ResetFilters
              clearFilters={clearFilters}
              activeFilter={activeFilter}
            />
            <TagsFilter
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
