import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Button, FlatList, StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { GardenTabScreenProps } from "../types";
import { format } from "date-fns";
import { useAppDispatch } from "../store";
import { gardenActions } from "../services/garden/gardenSlice";
import { Calendar } from "../components/shared/Calendar";
import { CrossBtn } from "../components/shared/CrossBtn";
import { picIdContext, pressedTagsContext } from "../services/context";
import { TagProps } from "../services/types";
import { AddTags } from "../components/shared/Tags/AddTags";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from "@reduxjs/toolkit";
import { Image } from "react-native";

export const NewVeggieLogModalScreen = ({
  navigation,
  route,
}: GardenTabScreenProps<"VeggieScreen">) => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [date, setDate] = useState(Date.now());
  const [notes, setNotes] = useState("");
  const { selectedGardenId, selectedBedId, veggieId } = route.params;
  const { pressedTags, setPressedTags } = useContext(pressedTagsContext);
  const { picId, setPicId } = useContext(picIdContext);
  const [payloadTags, setPayloadTags] = useState<TagProps[]>([]);
  const [payloadPics, setPayloadPics] = useState<string[]>([]);
  const [previewPics, setPreviewPics] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setPayloadTags([...pressedTags]);
  }, [pressedTags]);

  useEffect(() => {
    if (picId) {
      setPayloadPics([...payloadPics, picId]);
    }
  }, [picId]);

  const createPreviewPics = () => {
    const takenPics = payloadPics.map((pic) => {
      return new Promise(async (resolve, reject) => {
        const convertedPic = await AsyncStorage.getItem(pic);
        resolve(convertedPic);
      });
    });
    return Promise.all(takenPics);
  };

  //***Telmo: Is it better how I have setup useEffect with function or better with just logic? TS problem line 148
  useEffect(() => {
    const displayPreviewPics = () => {
      createPreviewPics().then((convertedPicArray) => {
        setPreviewPics(convertedPicArray);
      });
    };
    displayPreviewPics();
  }, [payloadPics]);

  const handleSubmit = () => {
    dispatch(
      gardenActions.addVeggieLog({
        selectedGardenId,
        selectedBedId,
        veggieId,
        newLog: { date, notes, payloadTags, payloadPics },
      })
    );
    setPressedTags([]);
    setPreviewPics([]);
    navigation.goBack();
  };

  useLayoutEffect(() => {
    const goBackAndClear = () => {
      setPressedTags([]);
      setPreviewPics([]);
      navigation.goBack();
    };

    navigation.setOptions({
      headerRight: () => <Button title="Add" onPress={handleSubmit} />,
      headerLeft: () => <Button title="Cancel" onPress={goBackAndClear} />,
    });
  }, [navigation, date, notes, payloadTags, payloadPics]);

  const dismissAndNavigate = () => {
    // navigation.goBack();
    navigation.navigate("CameraModal", {
      selectedGardenId,
      selectedBedId,
      veggieId,
    });
  };

  const dateCalFormatted = format(new Date(date), "yyyy-MM-dd");

  const con = () => {
    console.log("payloadPics", payloadPics);
    console.log("previewPics", previewPics);
  };

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
      <Button title="con" onPress={con} />
      <AddTags />
      <View style={{ height: 100, backgroundColor: "grey" }}>
        <Button title="Add Picture" onPress={dismissAndNavigate} />
        {previewPics.length > 0 && (
          <FlatList
            data={previewPics}
            keyExtractor={() => nanoid()}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={{ width: 50, height: 50 }} />
            )}
            horizontal={true}
          />
        )}
      </View>
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
