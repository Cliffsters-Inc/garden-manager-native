import { format } from "date-fns";
import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import { Text, View } from "../../components/Themed";
import {
  resetDateFilters,
  setLogsByDate,
  switchFilterByDate,
} from "../../features/Filters/filter.slice";
import { logSelectors } from "../../features/log/log.slice";
import { useAppDispatch, useAppSelector } from "../../store";
import { RangeSelector } from "../FilterModal/RangeSelector";
import { DatePicker } from "./DatePicker";

interface Props {
  dateRange: DateRangeObj;
  setDateRange: React.Dispatch<React.SetStateAction<DateRangeObj>>;
}

export type DateRangeObj = {
  startingDate: Date | null;
  endingDate: Date | null;
};

export const DateFilter = ({ dateRange, setDateRange }: Props) => {
  const dispatch = useAppDispatch();
  const globalLogs = useAppSelector(logSelectors.selectAll);
  const LogsByDate = useAppSelector((state) => state.filters.logsBydate);
  const [showModal, setShowModal] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectingStartdate, setSelectingStartdate] = useState(true);
  //can i use these values for replace others??
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

  const range = [startDate, endDate];
  const rangeText = ({ item }: { item: string }) => <Text>{item}</Text>;
  const seperator = () => (!emptyDateRange ? <Text> - </Text> : <Text />);
  const renderedList = (
    <FlatList
      data={range}
      renderItem={rangeText}
      ItemSeparatorComponent={seperator}
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
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          visible={showModal}
          onRequestClose={() => {
            setShowModal(!showModal);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text onPress={openStartDatePicker} style={styles.modalText}>
                Start Date
              </Text>
              {dateRange.startingDate && <Text>{startDate}</Text>}
              <Text onPress={openEndDatePicker} style={styles.modalText}>
                End Date
              </Text>
              {dateRange.endingDate && <Text>{endDate}</Text>}
              <Button title="con" onPress={con} />
              <Button title="Reset Dates" onPress={clearDateRange} />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={dateFilter}
              >
                <Text style={styles.textStyle}>Filter Dates</Text>
              </Pressable>
            </View>
          </View>
          <DatePicker
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            createDateRange={createDateRange}
          />
        </Modal>
      </View>
      <RangeSelector
        name="Date"
        handlePress={() => setShowModal(true)}
        list={renderedList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
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
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    // backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    // color: "white",
    fontWeight: "bold",
    // textAlign: "center",
  },
  modalText: {
    marginTop: 20,
    marginBottom: 15,
    textAlign: "center",
  },
});
