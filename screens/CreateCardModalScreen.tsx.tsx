import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, TextInput } from "react-native";
import { gardenActions } from "../services/garden/gardenSlice";
import { NewCardForm } from "../services/types";
import { useAppDispatch } from "../store";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import React from "react";

export const CreateCardModalScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"CreateCardModal">) => {
  const appDispatch = useAppDispatch();

  const { selectedGardenId, areaTitle, routeName } = route.params;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newCardName: "",
    },
  });

  const submitName = (data: NewCardForm) => {
    routeName === "GardenTabScreen"
      ? appDispatch(gardenActions.addGarden({ name: data.newCardName }))
      : appDispatch(
          gardenActions.addBed({ name: data.newCardName, id: selectedGardenId })
        );
    navigation.goBack();
    reset({ ...data, newCardName: "" });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Done" onPress={handleSubmit(submitName)} />
      ),
      title: `Name new ${areaTitle}`,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
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
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={`New ${areaTitle} name`}
              style={styles.input}
              onBlur={onBlur}
              value={value}
              autoFocus={true}
              onChangeText={(value) => onChange(value)}
              onSubmitEditing={handleSubmit(submitName)}
            />
          </View>
        )}
        name="newCardName"
      />
      {errors.newCardName && <Text>{errors.newCardName.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#71BC78",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  input: {
    borderColor: "black",
    height: 50,
    width: 250,
  },
});
