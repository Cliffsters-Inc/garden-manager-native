import { Feather } from "@expo/vector-icons";
import { FunctionComponent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { BottomSheet, Button, Card } from "react-native-elements";
import { gardenActions } from "../services/garden/gardenSlice";
import { NewBedForm } from "../services/types";
import { useAppDispatch } from "../store";
import { Text, View } from "./Themed";

type BedCardsProps = {
  selectedGardenId: string;
};

export const AddBedCard: FunctionComponent<BedCardsProps> = ({
  selectedGardenId,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const appDispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newBedName: "",
    },
  });

  const onSubmit = (data: NewBedForm) => {
    appDispatch(
      gardenActions.addBed({ name: data.newBedName, id: selectedGardenId })
    );
    setIsVisible(false);
    reset({ ...data, newBedName: "" });
    console.log("newBedName: ", data.newBedName);
  };

  const toggleHide = () => {
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.container} onPress={() => setIsVisible(true)}>
        <Card containerStyle={styles.card}>
          <Card.Title>Add New Bed</Card.Title>
          <Feather name="plus-circle" size={24} color="black" />
        </Card>
      </Pressable>
      <BottomSheet
        modalProps={{}}
        isVisible={isVisible}
        containerStyle={styles.bottomSheet}
      >
        <View>
          <Controller
            control={control}
            rules={{
              required: "Name is required",
              maxLength: {
                value: 20,
                message: "Too many characters",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="New Bed Name"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                autoCapitalize={"sentences"}
              />
            )}
            name="newBedName"
          />
          {errors.newBedName && <Text>{errors.newBedName.message}</Text>}
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
        <Button onPress={toggleHide}>Hide</Button>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 15,
    marginTop: 100,
  },
  card: {
    minHeight: 80,
    minWidth: 100,
    borderWidth: 2,
  },
  bottomSheet: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    height: 80,
    padding: 10,
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 30,
  },
});
