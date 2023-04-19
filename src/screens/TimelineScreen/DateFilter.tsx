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
  const [showModal, setShowModal] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectingStartdate, setSelectingStartdate] = useState(true);
  const completedDateRange = dateRange.startingDate && dateRange.endingDate;
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

  let displayWarning = false;
  const logsInRange = completedDateRange
    ? globalLogs.some(
        (log) =>
          new Date(log.date) >= dateRange.startingDate! &&
          new Date(log.date) <= dateRange.endingDate!
      )
    : false;

  if (completedDateRange && !logsInRange) {
    displayWarning = true;
  } else {
    displayWarning = false;
  }

  const emptyDateRange =
    dateRange.startingDate === null && dateRange.endingDate === null;
  const dateFilter = () => {
    const logsToFilter = [...globalLogs];
    const logsInRange = completedDateRange
      ? logsToFilter
          .filter(
            (log) =>
              new Date(log.date) >= dateRange.startingDate! &&
              new Date(log.date) <= dateRange.endingDate!
          )
          .map((log) => log.id)
      : [];

    if (logsInRange.length > 0) {
      dispatch(setLogsByDate(logsInRange));
      setShowModal(!showModal);
    } else if (emptyDateRange) {
      setShowModal(!showModal);
    }
  };

  const Warning = () =>
    displayWarning ? (
      <Text style={styles.warning}>
        Selected date range does not contain logs.
      </Text>
    ) : null;

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

  return (
    <View>
      <Modal animationType="slide" visible={showModal}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <RangeDisplay />
            <Warning />
            <Pressable
              style={
                !displayWarning
                  ? styles.button
                  : [styles.button, styles.buttonDisabled]
              }
              onPress={dateFilter}
            >
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
  buttonDisabled: {
    opacity: 0.3,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
  },
  warning: {
    color: "red",
    textAlign: "center",
    fontSize: 15,
    marginBottom: 5,
  },
});
