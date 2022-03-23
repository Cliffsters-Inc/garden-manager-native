import { Feather } from "@expo/vector-icons";
import { FunctionComponent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { BottomSheet, Button, Card, Input } from "react-native-elements";
import { View } from "./Themed";

export const AddGardenCard: FunctionComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [text, onChangeText] = useState("");
  const [number, onChangeNumber] = useState("");

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

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  const con = () => {
    console.log("visible: ", isVisible);
    console.log("text: ", text);
    console.log("number: ", number);
  };

  return (
    <View>
      <Button onPress={con}>con</Button>
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
        <View style={styles.inputContainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("newGardenName", {
                required: "Please enter new garden name",
              })}
              placeholder={"New garden name"}
            />
            <input
              {...register("hoursOfSun")}
              placeholder={"Hours of sun this garden recieves"}
            />
            <select {...register("sunDirection")}>
              <option value="north">north</option>
              <option value="east">east</option>
              <option value="south">south</option>
              <option value="west">west</option>
            </select>
            <input type="submit" />
          </form>
        </View>
      </BottomSheet>
    </View>
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
    backgroundColor: "black",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: "80%",
  },
});
