import { useLayoutEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, TextInput } from "react-native";
import { GardenTabScreenProps } from "../types";
import { Text, View } from "./Themed";

type Props = {
  notes: string | undefined;
  changeHandler: (note: string) => void;
  navigation: GardenTabScreenProps<"VeggieScreen">["navigation"];
};

export const VeggieNotesField = ({
  notes,
  changeHandler,
  navigation,
}: Props) => {
  const [notesFieldEditing, setNotesFieldEditing] = useState(false);
  const [text, setText] = useState(notes);

  const handleDone = () => {
    if (typeof text === "string") changeHandler(text);
    setNotesFieldEditing(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        notesFieldEditing ? <Button title="Done" onPress={handleDone} /> : null,
    });
  }, [navigation, notesFieldEditing, text]);

  const notesText = (
    <ScrollView style={styles.border}>
      <Text onPress={() => setNotesFieldEditing(true)}>{notes}</Text>
    </ScrollView>
  );

  const notesField = (
    <TextInput
      value={text}
      onChangeText={setText}
      onBlur={handleDone}
      autoFocus
      multiline
      style={[styles.border, { paddingTop: 10 }]}
    />
  );

  const addNoteBtn = (
    <View style={{ alignItems: "flex-start" }}>
      <Button title="Add note" onPress={() => setNotesFieldEditing(true)} />
    </View>
  );

  return (
    <View>
      {!notesFieldEditing && !notes ? (
        addNoteBtn
      ) : (
        <View>
          <Text style={styles.title}> Notes</Text>
          {notesFieldEditing ? notesField : notesText}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  border: {
    borderColor: "#d5d5d5",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    maxHeight: 92,
  },
});