import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { View } from "../Themed";

type props = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddGardenButton: React.FunctionComponent<props> = ({
  setIsVisible,
}) => {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => setIsVisible(true)}
        title={"Add New Garden"}
        containerStyle={{
          borderRadius: 30,
          marginHorizontal: 40,
          marginVertical: 30,
          width: 200,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    // backgroundColor: "blue",
  },
});
