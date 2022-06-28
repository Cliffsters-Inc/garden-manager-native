import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { bedActions, gardenActions } from "../services/actions";
import { bedSelectors } from "../services/bed/bed.slice";
import { gardenSelectors } from "../services/garden/garden.slice";
import { useAppDispatch, useAppSelector } from "../store";
import { RootStackScreenProps } from "../types";

export const RenameCardModalScreen = ({
  route,
  navigation,
}: RootStackScreenProps<"RenameCardModal">) => {
  const appDispatch = useAppDispatch();

  const { selectedGardenId, routeName, selectedBedId } = route.params;

  const selectedGardenName = useAppSelector((state) =>
    gardenSelectors.selectById(state, selectedGardenId)
  )?.name;

  const selectedBedName =
    selectedBedId &&
    useAppSelector((state) => bedSelectors.selectById(state, selectedBedId))
      ?.name;

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

  const submitNewName = (data: { newCardName: string }) => {
    routeName === "GardenTabScreen"
      ? appDispatch(
          gardenActions.update({
            id: selectedGardenId,
            changes: { name: data.newCardName },
          })
        )
      : selectedBedId &&
        appDispatch(
          bedActions.update({
            id: selectedBedId,
            changes: { name: data.newCardName },
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
