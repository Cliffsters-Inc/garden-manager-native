import { useLayoutEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, TextInput } from "react-native";
import { useAppDispatch } from "../store";
import { GardenTabScreenProps } from "../types";
import { Text, View } from "./Themed";

type Props = {
  notes: string | undefined;
  navigation: GardenTabScreenProps<"VeggieScreen">["navigation"];
  route: GardenTabScreenProps<"VeggieScreen">["route"];
};

export const VeggieNotesField = ({ notes, navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const [editingText, setEditingText] = useState<string | null>(null);
  const notesFieldEditing = editingText !== null;
  const { veggieId } = route.params;

  const handleSubmit = (text: string) => {
    dispatch(
      gardenActions.updateVeggieField({
        selectedGardenId,
        selectedBedId,
        veggieId,
        field: "notes",
        update: text,
      })
    );
  };

  const handleCancel = () => setEditingText(null);

  const handleDone = () => {
    if (editingText !== null) handleSubmit(editingText);
    setEditingText(null);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () =>
        notesFieldEditing ? (
          <Button title="Cancel" onPress={handleCancel} />
        ) : null,
      headerRight: () =>
        notesFieldEditing ? <Button title="Done" onPress={handleDone} /> : null,
    });
  }, [navigation, notesFieldEditing, editingText]);

  const notesText = (
    <ScrollView style={styles.border}>
      <Text onPress={() => notes && setEditingText(notes)}>{notes}</Text>
    </ScrollView>
  );

  const notesField = notesFieldEditing && (
    <TextInput
      value={editingText}
      onChangeText={setEditingText}
      onBlur={handleDone}
      autoFocus
      multiline
      style={[styles.border, { paddingTop: 10 }]}
    />
  );

  const addNoteBtn = (
    <View style={{ alignItems: "flex-start" }}>
      <Button title="Add note" onPress={() => setEditingText("")} />
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
