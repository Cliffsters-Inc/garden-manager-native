import { format } from "date-fns";
import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import {
  resetDateFilters,
  setLogsByDate,
} from "../../features/Filters/filter.slice";
import { logSelectors } from "../../features/log/log.slice";
import { useAppDispatch, useAppSelector } from "../../store";
import { RangeSelector } from "../FilterModal/RangeSelector";
import { DatePicker } from "./DatePicker";

export type DateRangeObj = {
  startingDate: Date | null;
  endingDate: Date | null;
};

export const DateFilter: React.FC<{
  dateRange: DateRangeObj;
  setDateRange: React.Dispatch<React.SetStateAction<DateRangeObj>>;
}> = ({ dateRange, setDateRange }) => {
  const dispatch = useAppDispatch();
  const globalLogs = useAppSelector(logSelectors.selectAll);
  const LogsByDate = useAppSelector((state) => state.filters.logsBydate);
  const [showModal, setShowModal] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectingStartdate, setSelectingStartdate] = useState(true);
  const startDate = dateRange.startingDate
    ? format(dateRange.startingDate, "dd-MM-yyyy")
    : "";
  const endDate = dateRange.endingDate
    ? format(dateRange.endingDate, "dd-MM-yyyy")
    : "";

  const openStartDatePicker = () => {
    setSelectingStartdate(true);
    setShowPicker(true);
  };

  const openEndDatePicker = () => {
    setSelectingStartdate(false);
    setShowPicker(true);
  };

  //would this be better if applied directly to button?
  const createDateRange = (date: Date) => {
    if (selectingStartdate) {
      setDateRange((prevState) => ({ ...prevState, startingDate: date }));
    } else {
      setDateRange((prevState) => ({ ...prevState, endingDate: date }));
    }
  };

  const clearDateRange = () => {
    setDateRange({ startingDate: null, endingDate: null });
    dispatch(resetDateFilters());
  };

  const emptyDateRange =
    dateRange.startingDate === null && dateRange.endingDate === null;
  const dateFilter = () => {
    const logsToFilter = [...globalLogs];
    const logsInRange = logsToFilter
      .filter(
        (log) =>
          //non-null assertion being made here but it could be null, add conditional?
          new Date(log.date) >= dateRange.startingDate! &&
          new Date(log.date) <= dateRange.endingDate!
      )
      .map((log) => log.id);
    console.log("in range", logsInRange);

    if (logsInRange.length > 0) {
      dispatch(setLogsByDate(logsInRange));
      setShowModal(!showModal);
      //add display warning for incorrect date range?
    } else if (emptyDateRange) {
      setShowModal(!showModal);
    }
  };

  const RangeDisplay = () => (
    <View style={styles.rangeDisplay}>
      <Text onPress={openStartDatePicker} style={styles.picker}>
        Start Date
      </Text>
      {dateRange.startingDate && <Text>{startDate}</Text>}
      <Text onPress={openEndDatePicker} style={styles.picker}>
        End Date
      </Text>
      {dateRange.endingDate && <Text>{endDate}</Text>}
    </View>
  );

  const range = [startDate, endDate];
  const rangeText = ({ item }: { item: string }) => (
    <Text style={styles.text}>{item}</Text>
  );
  const seperator = () =>
    !emptyDateRange ? <Text style={styles.text}> - </Text> : <Text />;
  const renderedList = (
    <FlatList
      data={range}
      renderItem={rangeText}
      ItemSeparatorComponent={seperator}
      style={{ marginLeft: 15 }}
      horizontal
    />
  );

  const con = () => {
    console.log("range", range);
    // console.log("logsBydate", LogsByDate);
    // console.log("dateRange", dateRange);
    // console.log("selectingStartdate", selectingStartdate);
  };

  return (
    <View>
      <Modal animationType="slide" visible={showModal}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <RangeDisplay />
            <Pressable style={styles.button} onPress={dateFilter}>
              <Text style={styles.buttonText}>Filter Dates</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={clearDateRange}>
              <Text style={styles.buttonText}>Reset Dates</Text>
            </Pressable>
          </View>
          <DatePicker
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            createDateRange={createDateRange}
          />
        </View>
      </Modal>
      <RangeSelector
        name="Date"
        handlePress={() => setShowModal(true)}
        list={renderedList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 40,
    marginBottom: 100,
  },
  modalView: {
    height: 400,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
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
  rangeDisplay: {
    marginBottom: 50,
  },
  picker: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    width: 150,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 5,
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
  },
});
