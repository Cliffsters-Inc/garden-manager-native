import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { BottomSheet, Button, Divider, Text } from "react-native-elements";
import { View } from "./Themed";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "../store";
import { gardenActions } from "../services/garden/gardenSlice";
import { NewGardenForm } from "../services/types";

type props = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddGardenButton: React.FunctionComponent<props> = ({
  setIsVisible,
}) => {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => setIsVisible(true)}
        title={"Add New Garden"}
        containerStyle={{
          borderRadius: 30,
          marginHorizontal: 40,
          marginVertical: 30,
          width: 200,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    // backgroundColor: "blue",
  },
});
