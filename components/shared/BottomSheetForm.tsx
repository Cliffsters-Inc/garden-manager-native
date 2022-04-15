import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";
import { BottomSheet, Divider } from "react-native-elements";
import { gardenActions } from "../../services/garden/gardenSlice";
import { NewCardForm } from "../../services/types";
import { useAppDispatch } from "../../store";
import { Text, View } from "../Themed";

type props = {
  isVisible: boolean | undefined;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  areaTitle: string;
  selectedGardenId?: string;
};

export const BottomSheetForm: React.FunctionComponent<props> = ({
  isVisible,
  setIsVisible,
  areaTitle,
  selectedGardenId,
}) => {
  const appDispatch = useAppDispatch();

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
  console.log("areaTitle: ", areaTitle);

  const submitName = (data: NewCardForm) => {
    areaTitle === "garden"
      ? appDispatch(gardenActions.addGarden({ name: data.newCardName }))
      : appDispatch(
          gardenActions.addBed({ name: data.newCardName, id: selectedGardenId })
        );
    setIsVisible(false);
    reset({ ...data, newCardName: "" });
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
    >
      <View style={styles.headerContainer}>
        <Text onPress={() => setIsVisible(false)} style={{ fontSize: 20 }}>
          Cancel
        </Text>
        <Text
          style={{ fontWeight: "bold", fontSize: 25 }}
        >{`Name ${areaTitle}`}</Text>
        <Text onPress={handleSubmit(submitName)} style={{ fontSize: 20 }}>
          Done
        </Text>
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
              placeholder={`New ${areaTitle} name`}
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              autoFocus={true}
              autoCapitalize={"sentences"}
            />
          </View>
        )}
        name="newCardName"
      />
      {errors.newCardName && <Text>{errors.newCardName.message}</Text>}
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
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
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
