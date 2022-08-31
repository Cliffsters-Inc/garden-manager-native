import { format } from "date-fns";
import { useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import { Text, View } from "../../components/Themed";
import { VeggieLogNormalised } from "../../features/entity.types";
import { logSelectors } from "../../features/log/log.slice";
import { useAppSelector } from "../../store";
import { DatePicker } from "./DatePicker";

interface Props {
  setLogsFilteredByDate: React.Dispatch<
    React.SetStateAction<VeggieLogNormalised[]>
  >;
}

export type DateRangeObj = {
  startingDate: Date | null;
  endingDate: Date | null;
};

export const DateFilter = ({ setLogsFilteredByDate }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isChoosingStartDate, setIsChoosingStartDate] = useState(true);
  const [dateRange, setDateRange] = useState<DateRangeObj>({
    startingDate: null,
    endingDate: null,
  });

  // let isChoosingStartDate = true;
  const openStartDatePicker = () => {
    setIsChoosingStartDate(true);
    // isChoosingStartDate = true;
    setDatePickerVisibility(true);
  };

  const openEndDatePicker = () => {
    setIsChoosingStartDate(false);
    // isChoosingStartDate = false;
    setDatePickerVisibility(true);
  };

  const createDateRange = (date: Date) => {
    if (isChoosingStartDate) {
      setDateRange((prevState) => ({ ...prevState, startingDate: date }));
    } else {
      setDateRange((prevState) => ({ ...prevState, endingDate: date }));
    }
  };

  const clearDateRange = () => {
    setDateRange({ startingDate: null, endingDate: null });
  };

  const globalLogs = useAppSelector(logSelectors.selectAll);

  const compareDates = () => {
    const datesInRange = globalLogs.filter(
      (log) =>
        //non-null assertion being made here but it could be null, what are possible problems?
        new Date(log.date) >= dateRange.startingDate! &&
        new Date(log.date) <= dateRange.endingDate!
    );
    setLogsFilteredByDate(datesInRange);
  };

  const filterAndCloseModal = () => {
    setModalVisible(!modalVisible);
    compareDates();
  };

  const con = () => {
    console.log("dateRange", dateRange);
    console.log("isChoosingStartDate", isChoosingStartDate);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
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
              <Text>{format(dateRange.startingDate!, "dd-MM-yyyy")}</Text>
            )}
            <Button title="con" onPress={con} />
            <Button title="Reset Dates" onPress={clearDateRange} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={filterAndCloseModal}
            >
              <Text style={styles.textStyle}>Filter Dates</Text>
            </Pressable>
          </View>
        </View>
        <DatePicker
          isDatePickerVisible={isDatePickerVisible}
          setDatePickerVisibility={setDatePickerVisibility}
          createDateRange={createDateRange}
        />
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
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
