import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";
import { BottomSheet, Divider } from "react-native-elements";
import { gardenActions } from "../services/garden/gardenSlice";
import { NewGardenForm } from "../services/types";
import { useAppDispatch } from "../store";
import { Text, View } from "./Themed";

type props = {
  isVisible: boolean | undefined;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FormBottomSheet: React.FunctionComponent<props> = ({
  isVisible,
  setIsVisible,
}) => {
  const appDispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newGardenName: "",
    },
  });

  const submitName = (data: NewGardenForm) => {
    appDispatch(gardenActions.addGarden({ name: data.newGardenName }));
    setIsVisible(false);
    reset({ ...data, newGardenName: "" });
  };

  return (
    <BottomSheet
      modalProps={{
        presentationStyle: "pageSheet",
        transparent: false,
        statusBarTranslucent: true,
      }}
      isVisible={isVisible}
      containerStyle={styles.bottomSheet}

      // backgroundComponent={}
    >
      <View style={styles.headerContainer}>
        {/* <Text style={styles.headerText}> */}
        <Text onPress={() => setIsVisible(false)} style={{ fontSize: 20 }}>
          Cancel
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 25 }}>Name Garden</Text>
        <Text onPress={handleSubmit(submitName)} style={{ fontSize: 20 }}>
          Done
        </Text>
        {/* </Text> */}
      </View>
      <Divider />
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
              placeholder="New garden Name"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              autoCapitalize={"sentences"}
            />
          </View>
        )}
        name="newGardenName"
      />
      {errors.newGardenName && <Text>{errors.newGardenName.message}</Text>}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#71BC78",
  },
  headerContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    // backgroundColor: "orange",
  },
  inputContainer: {
    // backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  input: {
    // borderWidth: 2,
    borderColor: "black",
    height: 50,
    width: 250,
    // borderRadius: 4,
  },
});
