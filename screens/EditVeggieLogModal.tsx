import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Button, Pressable, StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "../store";
import { Calendar } from "../components/shared/Calendar";
import { CrossBtn } from "../components/shared/CrossBtn";
import { logSelectors } from "../services/log/log.slice";
import { logActions } from "../services/actions";
import { AddTags } from "../components/shared/Tags/AddTags";
import { pressedTagsContext } from "../services/context";
import { TagProps } from "../services/types";

export const EditVeggieLogModal = ({
  navigation,
  route,
}: RootStackScreenProps<"EditVeggieLogModal">) => {
  const { logId } = route.params;
  const log = useAppSelector((state) => logSelectors.selectById(state, logId));

  const { pressedTags, setPressedTags } = useContext(pressedTagsContext);
  const [payloadTags, setPayloadTags] = useState<TagProps[]>([]);
  const [logTags, setLogTags] = useState([...(log?.payloadTags || [])]);
  const [tagChange, setTagChange] = useState(false);

  const [date, setDate] = useState(log?.date ?? Date.now());
  const [notes, setNotes] = useState(log?.notes ?? "");
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const selectorLogs = [...logTags];
    setPressedTags(selectorLogs);
  }, []);

  useEffect(() => {
    setPayloadTags([...pressedTags]);
  }, [pressedTags]);

  const handleUpdate = () => {
    if (log)
      dispatch(
        logActions.update({
          id: log.id,
          changes: { date, notes, payloadTags },
        })
      );
    setPressedTags([]);
    navigation.goBack();
  };

  const handleDelete = () => {
    if (log) dispatch(logActions.remove(log.id));
    navigation.goBack();
  };

  useLayoutEffect(() => {
    const logChanged =
      notes !== log?.notes ||
      date !== log?.date ||
      payloadTags !== log?.payloadTags;
    const goBackAndClear = () => {
      setPressedTags([]);
      navigation.goBack();
    };

    navigation.setOptions({
      headerRight: () =>
        //logChanged will nedd to be converted to recognise tag changes
        logChanged ? <Button title="Done" onPress={handleUpdate} /> : null,
      headerLeft: () => <Button title="Cancel" onPress={goBackAndClear} />,
    });
  }, [navigation, date, notes, payloadTags]);

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
      <AddTags />
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
