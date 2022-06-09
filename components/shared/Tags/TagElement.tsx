import { Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { TagProps } from "../../../services/types";
import { Text, View } from "../../Themed";

export const Tag = ({
  tagLabel,
  tagColor,
  tagIcon,
  isRemovable,
  extraStyleProps,
}: TagProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        {/* <TagIcon iconColor={tagColor} selectedIcon={tagIcon} /> */}
      </View>
      <View style={[styles.textContainer, { backgroundColor: tagColor }]}>
        <Text style={[styles.label, extraStyleProps?.label]}>{tagLabel}</Text>
        {/* //remove this and use composition instead */}
        {isRemovable && (
          <Feather
            name="x-square"
            size={12}
            color="black"
            style={{ paddingTop: 2, paddingLeft: 2, paddingRight: 5 }}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    paddingLeft: 10,
    // justifyContent: "center",
    // alignContent: "center",
  },
  icon: {
    justifyContent: "flex-end",
  },
  textContainer: {
    flexDirection: "row",
    // justifyContent: "center",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    paddingTop: 3,
    paddingLeft: 8,

    borderRadius: 200,
    minWidth: 60,
    marginTop: 10,
  },
  label: {
    // paddingRight: 15,
    textTransform: "capitalize",
  },
});
