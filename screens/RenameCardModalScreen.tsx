import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { gardenActions, gardenSelectors } from "../services/garden/gardenSlice";
import { RenameCardForm } from "../services/types";
import { useAppDispatch, useAppSelector } from "../store";
import { RootStackScreenProps } from "../types";

export const RenameCardModalScreen = ({
  route,
  navigation,
}: RootStackScreenProps<"RenameCardModal">) => {
  const appDispatch = useAppDispatch();

  const { selectedGardenId, routeName, selectedBedId } = route.params;

  const selectedGardenName = useAppSelector(
    (state) =>
      gardenSelectors.selectCurrentGarden(state, selectedGardenId)?.name
  );

  const selectedBedName = useAppSelector(
    (state) =>
      gardenSelectors.selectCurrentBed(state, selectedGardenId, selectedBedId)
        ?.name
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newCardName:
        routeName === "GardenTabScreen" ? selectedGardenName : selectedBedName,
    },
  });

  const submitNewName = (data: RenameCardForm) => {
    routeName === "GardenTabScreen"
      ? appDispatch(
          gardenActions.renameGarden({
            id: selectedGardenId,
            newName: data.newCardName,
          })
        )
      : appDispatch(
          gardenActions.renameBed({
            selectedGardenId: selectedGardenId,
            newName: data.newCardName,
            selectedBedId: selectedBedId,
          })
        );
    navigation.popToTop();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Done" onPress={handleSubmit(submitNewName)} />
      ),
      title:
        routeName === "GardenTabScreen"
          ? `Rename ${selectedGardenName}`
          : `Rename ${selectedBedName}`,
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
              style={styles.input}
              onBlur={onBlur}
              value={value}
              autoFocus={true}
              onChangeText={(value) => onChange(value)}
              onSubmitEditing={handleSubmit(submitNewName)}
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
