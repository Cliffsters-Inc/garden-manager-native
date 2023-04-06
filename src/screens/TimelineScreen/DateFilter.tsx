import { format } from "date-fns";
import { useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import { Text, View } from "../../components/Themed";
import { setLogsByDate } from "../../features/Filters/filter.slice";
import { logSelectors } from "../../features/log/log.slice";
import { useAppDispatch, useAppSelector } from "../../store";
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
  };

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
    }
    setShowModal(!showModal);
  };

  const con = () => {
    console.log("logsBydate", LogsByDate);
    // console.log("dateRange", dateRange);
    // console.log("selectingStartdate", selectingStartdate);
  };

  return (
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
            {dateRange.startingDate && (
              <Text>{format(dateRange.startingDate!, "dd-MM-yyyy")}</Text>
            )}
            <Text onPress={openEndDatePicker} style={styles.modalText}>
              End Date
            </Text>
            {dateRange.endingDate && (
              <Text>{format(dateRange.endingDate!, "dd-MM-yyyy")}</Text>
            )}
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
      <Pressable onPress={() => setShowModal(true)}>
        <Text style={styles.categorySelector}>Date Range</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
