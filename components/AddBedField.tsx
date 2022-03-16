import React, { useState } from "react";
import { Text, TextInput, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch } from "../store";
import { gardenActions } from "../services/garden/gardenSlice";

export const AddBedField = () => {
  const [text, setText] = useState("");
  const appDispatch = useAppDispatch();

  const handleAddBed = () => {
    appDispatch(gardenActions.addBed({ name: text }));
    setText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Add Bed: </Text>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="Garden bed name..."
      />
      <Button title="Add Bed" onPress={handleAddBed} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
  },
  input: {
    height: 40,
    alignSelf: "stretch",
    margin: 5,
    padding: 10,
    borderWidth: 1,
  },
});
