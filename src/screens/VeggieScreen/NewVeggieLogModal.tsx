import { format } from "date-fns";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Button, Image, StyleSheet, TextInput } from "react-native";

import { AddTags } from "../../components/Tags/AddTags";
import { Text, View } from "../../components/Themed";
import { pressedTagsContext } from "../../features/context";
import { Tag } from "../../features/entity.types";
import { logActions } from "../../features/log/log.slice";
import { photoSelectors } from "../../features/photos/photos.slice";
import { GardenScreenProps } from "../../navigation/navigation.types";
import { useAppDispatch, useAppSelector } from "../../store";
import { LocationObj } from "../BedScreen/BedCards";
import { Calendar } from "./Calendar";
import { CrossBtn } from "./CrossBtn";

export const NewVeggieLogModal = ({
  navigation,
  route,
}: GardenScreenProps<"VeggieScreen">) => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [date, setDate] = useState(Date.now());
  const [notes, setNotes] = useState("");
  const { veggieId, locationTitles } = route.params;
  const [payloadTags, setPayloadTags] = useState<Tag[]>([]);

  const appContext = useContext(pressedTagsContext);
  const pressedTags = appContext?.pressedTags;
  const setPressedTags = appContext?.setPressedTags;
  const location: LocationObj = locationTitles;

  const dispatch = useAppDispatch();
  const cachedPhotos = useAppSelector(photoSelectors.selectAllCachedPhotos);

  useEffect(() => {
    setPayloadTags([...pressedTags!]);
  }, [pressedTags]);
  const handleSubmit = () => {
    const { payload } = dispatch(
      logActions.add({
        veggie: veggieId,
        date,
        location,
        notes,
        photos: { entities: [], loading: "succeeded" },
        payloadTags,
      })
    );
    if (cachedPhotos) dispatch(logActions.moveCachePhotosToLogDir(payload.id));
    setPressedTags!([]);
    navigation.goBack();
  };

  useLayoutEffect(() => {
    const goBackAndClear = () => {
      setPressedTags!([]);
      navigation.goBack();
    };

    navigation.setOptions({
      headerRight: () => <Button title="Add" onPress={handleSubmit} />,
      headerLeft: () => <Button title="Cancel" onPress={goBackAndClear} />,
    });
  }, [navigation, date, location, notes, payloadTags]);

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
      <Button
        title="Add photo"
        onPress={() => navigation.navigate("CameraModal")}
      />
      <View style={{ flexDirection: "row" }}>
        {cachedPhotos &&
          cachedPhotos.map((photoUri) => (
            <Image
              key={photoUri}
              source={{ uri: photoUri, width: 50, height: 50 }}
            />
          ))}
      </View>
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
