import React from "react";

import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { BottomSheet, Button, Card, Input, Text } from "react-native-elements";
import { View } from "./Themed";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

export const AddGardenCard: React.FunctionComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newGardenName: "",
      hoursOfSun: 0,
      sunDirection: undefined,
    },
  });
  const onSubmit = (data: object) => console.log(data);

  enum SunEnum {
    north = "north",
    east = "east",
    south = "south",
    west = "west",
  }

  interface IFormInput {
    newGardenName: string;
    hoursOfSun: number;
    sunDirection: SunEnum;
  }

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
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="New garden Name"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="newGardenName"
          />
          {errors.newGardenName && <Text>You must name your new garden.</Text>}

          <Controller
            control={control}
            rules={{
              maxLength: 2,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Hours of sun recieved here"
                onBlur={onBlur}
                keyboardType="numeric"
                onChangeText={onChange}
                value={value}
              />
            )}
            name="hoursOfSun"
          />
          {/* <Controller
        control={control}
        // render={({ field }) => (
    
        // )}
        name="hoursOfSun"
    /> */}

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
    flex: 0.5,
    backgroundColor: "black",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "space-between",
    // marginBottom: "80%",
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
