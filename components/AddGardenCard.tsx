import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { BottomSheet, Button, Card, Input, Text } from "react-native-elements";
import { View } from "./Themed";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch } from "../store";
import { gardenActions } from "../services/garden/gardenSlice";
import { NewGardenForm } from "../services/types";

export const AddGardenCard: React.FunctionComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const appDispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newGardenName: "",
    },
  });

  const onSubmit = (data: NewGardenForm) => {
    appDispatch(gardenActions.addGarden({ name: data.newGardenName }));
  };

  const toggleHide = () => {
    setIsVisible(false);
  };

  return (
    <SafeAreaView>
      <Pressable style={styles.container} onPress={() => setIsVisible(true)}>
        <Card containerStyle={styles.card}>
          <Card.Title>Add Garden</Card.Title>
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
                placeholder="New garden Name"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                autoCapitalize={"sentences"}
              />
            )}
            name="newGardenName"
          />
          {errors.newGardenName && <Text>{errors.newGardenName.message}</Text>}
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
        <Button onPress={toggleHide}>Hide</Button>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 15,
  },
  card: {
    minHeight: 80,
    minWidth: 100,
    borderWidth: 1,
  },
  bottomSheet: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  inputContainer: {
    flex: 1,
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
