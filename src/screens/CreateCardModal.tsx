import { useLayoutEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, TextInput } from "react-native";

import { Text, View } from "../components/Themed";
import { bedActions } from "../features/bed/bed.slice";
import { gardenActions } from "../features/garden/garden.slice";
import { RootStackScreenProps } from "../navigation/navigation.types";
import { useAppDispatch } from "../store";

export const CreateCardModal = ({
  navigation,
  route,
}: RootStackScreenProps<"CreateCardModal">) => {
  const appDispatch = useAppDispatch();

  const selectedGardenId = route.params?.selectedGardenId;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newCardName: "",
    },
  });

  const submitName = (data: { newCardName: string }) => {
    appDispatch(
      selectedGardenId
        ? bedActions.add({
            name: data.newCardName,
            garden: route.params.selectedGardenId,
            veggies: [],
          })
        : gardenActions.add({ name: data.newCardName, beds: [] })
    );

    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Done" onPress={handleSubmit(submitName)} />
      ),
      title: `Name new ${selectedGardenId ? "bed" : "garden"}`,
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
              placeholder={`New ${selectedGardenId ? "bed" : "garden"} name`}
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
