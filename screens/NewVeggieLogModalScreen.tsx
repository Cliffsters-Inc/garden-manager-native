import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { GardenTabScreenProps } from "../types";
import { format } from "date-fns";
import { useAppDispatch } from "../store";
import { gardenActions } from "../services/garden/gardenSlice";
import { Calendar } from "../components/shared/Calendar";
import { CrossBtn } from "../components/shared/CrossBtn";
import { pressedTagsContext } from "../services/context";
import { TagProps } from "../services/types";
import { AddTags } from "../components/shared/Tags/AddTags";

export const NewVeggieLogModalScreen = ({
  navigation,
  route,
}: GardenTabScreenProps<"VeggieScreen">) => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [date, setDate] = useState(Date.now());
  const [notes, setNotes] = useState("");
  const { selectedGardenId, selectedBedId, veggieId } = route.params;
  const { pressedTags, setPressedTags } = useContext(pressedTagsContext);
  const [payloadTags, setPayloadTags] = useState<TagProps[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setPayloadTags([...pressedTags]);
  }, [pressedTags]);

  const handleSubmit = () => {
    dispatch(
      gardenActions.addVeggieLog({
        selectedGardenId,
        selectedBedId,
        veggieId,
        newLog: { date, notes, payloadTags },
      })
    );
    setPressedTags([]);
    navigation.goBack();
  };

  useLayoutEffect(() => {
    const goBackAndClear = () => {
      setPressedTags([]);
      navigation.goBack();
    };

    navigation.setOptions({
      headerRight: () => <Button title="Add" onPress={handleSubmit} />,
      headerLeft: () => <Button title="Cancel" onPress={goBackAndClear} />,
    });
  }, [navigation, date, notes, payloadTags]);

  const dateCalFormatted = format(new Date(date), "yyyy-MM-dd");

  return (
    <View style={styles.container}>
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
      <AddTags />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
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
});
