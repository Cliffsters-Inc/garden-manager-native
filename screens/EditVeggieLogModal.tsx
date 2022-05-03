import { useLayoutEffect, useState } from "react";
import { Button, Pressable, StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "../store";
import { gardenActions } from "../services/garden/gardenSlice";
import { gardenSelectors } from "../services/garden/garden.selectors";
import { Calendar } from "../components/shared/Calendar";
import { CrossBtn } from "../components/shared/CrossBtn";

export const EditVeggieLogModal = ({
  navigation,
  route,
}: RootStackScreenProps<"EditVeggieLogModal">) => {
  const { selectedGardenId, selectedBedId, veggieId, logId } = route.params;
  const log = useAppSelector((state) =>
    gardenSelectors.selectVeggieLog(
      state,
      selectedGardenId,
      selectedBedId,
      veggieId,
      logId
    )
  );
  const [date, setDate] = useState(log?.date ?? Date.now());
  const [notes, setNotes] = useState(log?.notes ?? "");

  const [calendarVisible, setCalendarVisible] = useState(false);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  const dispatch = useAppDispatch();

  const handleUpdate = () => {
    if (log)
      dispatch(
        gardenActions.updateVeggieLog({
          selectedGardenId,
          selectedBedId,
          veggieId,
          updatedLog: { id: log.id, date, notes },
        })
      );
    navigation.goBack();
  };

  const handleDelete = () => {
    if (log)
      dispatch(
        gardenActions.deleteVeggieLog({
          selectedGardenId,
          selectedBedId,
          veggieId,
          logId: log.id,
        })
      );
    navigation.goBack();
  };

  useLayoutEffect(() => {
    const logChanged = notes !== log?.notes || date !== log?.date;

    navigation.setOptions({
      headerRight: () =>
        logChanged ? <Button title="Done" onPress={handleUpdate} /> : null,
    });
  }, [navigation, date, notes]);

  const dateCalFormatted = format(new Date(date), "yyyy-MM-dd");

  return (
    <View style={styles.container}>
      <View>
        {calendarVisible ? (
          <View style={styles.calendar}>
            <CrossBtn
              style={{ padding: 5, alignSelf: "flex-end" }}
              onPress={() => setCalendarVisible(false)}
            />
            <Calendar
              current={dateCalFormatted}
              onDayPress={({ timestamp }) => {
                setDate(timestamp);
                setCalendarVisible(false);
              }}
              markedDates={{
                [dateCalFormatted]: { selected: true },
              }}
            />
          </View>
        ) : (
          <Text style={styles.date} onPress={() => setCalendarVisible(true)}>
            {format(new Date(date), "d MMMM yyyy")}
          </Text>
        )}
        <TextInput
          placeholder="Notes"
          value={notes}
          onChangeText={setNotes}
          multiline
          style={styles.notesContainer}
        />
      </View>
      {deleteConfirmationVisible ? (
        <View>
          <Text style={{ textAlign: "center", fontWeight: "bold", margin: 5 }}>
            Confirm deletion
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <Pressable
              onPress={() => setDeleteConfirmationVisible(false)}
              style={[styles.delBtnContainer, { width: 130 }]}
            >
              <Text style={[styles.delBtnText, { color: "gray" }]}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleDelete}
              style={[
                styles.delBtnContainer,
                { width: 130, backgroundColor: "#f93636" },
              ]}
            >
              <Text style={[styles.delBtnText, { color: "white" }]}>
                Delete log
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Pressable
          onPress={() => setDeleteConfirmationVisible(true)}
          style={styles.delBtnContainer}
        >
          <Text style={styles.delBtnText}>Delete this log</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  date: { fontSize: 30, fontWeight: "bold", marginBottom: 20 },
  calendar: {
    borderColor: "#d5d5d5",
    borderWidth: 2,
    borderRadius: 10,
    padding: 2,
    marginBottom: 10,
  },
  notesContainer: {
    paddingTop: 10,
    borderColor: "#d5d5d5",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    height: 92,
    maxHeight: 92,
  },
  delBtnContainer: {
    paddingTop: 10,
    borderColor: "#d5d5d5",
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height: 50,
    width: 200,
    marginBottom: 5,
    alignSelf: "center",
  },
  delBtnText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#f93636",
  },
});
