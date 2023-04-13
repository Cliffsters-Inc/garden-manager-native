import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet } from "react-native";
import { Button, Divider } from "react-native-elements";

import { convertToTag } from "../../components/Tags/Tag.utils";
import { TagElement } from "../../components/Tags/TagElement";
import { Text, View } from "../../components/Themed";
import { Tag } from "../../features/entity.types";
import { filterLogs, resetFilters } from "../../features/Filters/filter.slice";
import { logSelectors } from "../../features/log/log.slice";
import { useAppDispatch, useAppSelector } from "../../store";
import { DateFilter, DateRangeObj } from "./DateFilter";
import { LocationFilter, SelectedLocationsObj } from "./LocationFilter";
import { PhotoFilter } from "./PhotoFilter";
import { TagsFilterModal } from "./TagsFilterModal";

export const FilterModal = () => {
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
  const filteredLogs = useAppSelector((state) => state.filters.filteredLogs);
  const [modalVisible, setModalVisible] = useState(false);
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

  // useEffect(() => {
  //   dispatch(switchActiveFilter());
  //   console.log("render");
  // }, [logsByDate, filterByPic]);
  // useEffect(() => {
  //   dispatch(switchActiveFilter());
  //   console.log("render");
  // }, [filterByDate, filterByPic]);

  const renderTags = ({ item }: { item: Tag }) => {
    return <TagElement tag={item} hideIcon />;
  };

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
    setModalVisible(!modalVisible);
  };

  const con = () => {
    console.log("logsByDate", logsByDate);
    console.log("logsWithPic", logsWithPic);
    console.log("logByLocation", logsByLocation);
    // dispatch(switchActiveFilter());
    console.log("logsByTag", logsByTag);
    // console.log("filterByPic", filterByPic);
    // console.log("activeFilter", activeFilter);
    console.log("filteredLogs", filteredLogs);
  };

  const tagsToDisplay = selectedTags.map((tagName) => convertToTag(tagName));

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Button title="con" onPress={con} />
            <View style={{ flexDirection: "row" }}>
              <Pressable onPress={clearFilters}>
                <Text style={styles.categorySelector}>None</Text>
              </Pressable>
              <View style={{ marginLeft: 200, justifyContent: "flex-end" }}>
                {!activeFilter && (
                  <FontAwesome5 name="check" size={24} color="green" />
                )}
              </View>
            </View>
            <Divider color="black" />
            <View
              style={{ flexDirection: "row", maxHeight: 50, maxWidth: 100 }}
            >
              <TagsFilterModal
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
              <View style={{ maxHeight: 30 }}>
                <FlatList
                  data={tagsToDisplay}
                  keyExtractor={(item) => item.tagLabel}
                  horizontal
                  renderItem={renderTags}
                />
              </View>
              <View style={{ marginLeft: 50, justifyContent: "flex-end" }}>
                <AntDesign name="right" size={24} color="black" />
              </View>
            </View>
            <Divider />
            <View
              style={{
                justifyContent: "flex-start",
                marginTop: 20,
                marginLeft: 50,
                flexDirection: "row",
                maxHeight: 50,
                maxWidth: 100,
              }}
            >
              <DateFilter dateRange={dateRange} setDateRange={setDateRange} />
            </View>
            {dateRange.startingDate && (
              <Text>{format(dateRange.startingDate, "dd-MM-yyyy")}</Text>
            )}
            {dateRange.endingDate && (
              <Text> - {format(dateRange.endingDate, "dd-MM-yyyy")}</Text>
            )}
            <Divider />
            <View
              style={{
                flexDirection: "row",
                maxHeight: 50,
                maxWidth: 100,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  minWidth: 200,
                }}
              >
                <LocationFilter
                  selectedLocations={selectedLocations}
                  setSelectedLocations={setSelectedlocations}
                />
                <Text
                  style={{
                    flexDirection: "row",
                    fontSize: 20,
                  }}
                >
                  {selectedLocations.garden}{" "}
                  {selectedLocations.bed && `& ${selectedLocations.bed}`}
                </Text>
              </View>
            </View>
            <Divider />
            <PhotoFilter />
            <Divider />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={filter}
            >
              <Text style={styles.textStyle}>Accept Filters</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="filter" size={24} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    // justifyContent: "center",
    alignItems: "center",
    height: 400,
    marginBottom: 100,
    // marginTop: 22,
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
  categorySelector: {
    fontSize: 20,
    marginTop: 30,
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
