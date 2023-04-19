/* eslint-disable import/namespace */
import { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-vector-icons/Icon";

import { Tag } from "../../features/entity.types";
import { Text, View } from "../Themed";
import { TagIconElement } from "./TagIcon";

type TagProps = {
  tag: Tag;
  extraStyleProps?: { label?: object };
  children?: ReactElement<Icon>;
  hideIcon?: boolean;
};

export const TagElement = ({
  tag,
  extraStyleProps,
  children,
  hideIcon,
}: TagProps) => {
  const { tagLabel, tagColor, tagIcon } = tag;
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        {!hideIcon && (
          <TagIconElement iconColor={tagColor} selectedIcon={tagIcon} />
        )}
      </View>
      <View style={[styles.textContainer, { backgroundColor: tagColor }]}>
        <Text style={[styles.label, extraStyleProps?.label]}>{tagLabel}</Text>
        {children}
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
    minWidth: 70,
  },
  label: {
    textTransform: "capitalize",
  },
});
