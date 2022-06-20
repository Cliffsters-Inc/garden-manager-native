import { StyleSheet } from "react-native";
import { TagProps } from "../../../services/types";
import { Text, View } from "../../Themed";
import { TagIcon } from "./TagIcon";

export const Tag = ({
  tagLabel,
  tagColor,
  tagIcon,
  extraStyleProps,
}: TagProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <TagIcon iconColor={tagColor} selectedIcon={tagIcon} />
      </View>
      <View style={[styles.textContainer, { backgroundColor: tagColor }]}>
        <Text style={[styles.label, extraStyleProps?.label]}>{tagLabel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: 10,
  },
  icon: {
    justifyContent: "flex-end",
  },
  textContainer: {
    flexDirection: "row",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    paddingTop: 3,
    paddingLeft: 8,

    borderRadius: 200,
    minWidth: 60,
    marginTop: 10,
  },
  label: {
    textTransform: "capitalize",
  },
});
