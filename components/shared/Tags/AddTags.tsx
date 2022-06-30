import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import { pressedTagsContext } from "../../../services/context";
import { TagObject, TagProps } from "../../../services/types";
import { Text, View } from "../../Themed";
import {
  AddTagToList,
  convertToTag,
  defaultTagsList,
  RemoveTagFromList,
} from "./Tag.utils";
import { Tag } from "./TagElement";

export const AddTags = () => {
  // ***type error*** I set type in index.tsx L-70, why is it any below?
  const { pressedTags, setPressedTags } = useContext(pressedTagsContext);
  const [combinedTagsList, setCombinedTagsList] = useState<TagProps[]>([]);
  const [selectableTags, setSelectableTags] = useState<TagProps[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagProps[]>([]);

  useEffect(() => {
    // ***type error***
    const combinedTags: any = defaultTagsList.map((tag) => convertToTag(tag));
    setCombinedTagsList(combinedTags);
  }, []);

  useEffect(() => {
    const filteredList = combinedTagsList.filter((tag: TagProps) => {
      return !pressedTags.some((t: TagProps) => t.tagLabel === tag?.tagLabel);
    });
    setSelectableTags(filteredList);
  }, [pressedTags, combinedTagsList]);

  const filterList = (tagObject: TagProps[]) => {
    if (tagObject.length > 0) {
      setSelectedTags(pressedTags);
    }
  };

  useEffect(() => {
    console.log("**pressed effect**");
    filterList(pressedTags);
  }, [pressedTags]);

  const selectableOnPress = (tag: string) => {
    // ***type error***
    const pressedTagObject: any = AddTagToList(pressedTags, tag);
    setPressedTags(pressedTagObject);
  };

  const selectedOnPress = (tag: string) => {
    console.log("selectedOnPress");
    const removeTag = RemoveTagFromList(pressedTags, tag);
    setPressedTags([...removeTag]);
  };

  const renderSelectableItem = ({ item }: TagObject) => {
    return (
      <Pressable onPress={() => selectableOnPress(item.tagLabel)}>
        <Tag
          tagLabel={item.tagLabel}
          tagColor={item.tagColor}
          extraStyleProps={{ label: { paddingRight: 15 } }}
        />
      </Pressable>
    );
  };

  const renderSelectedItem = ({ item }: TagObject) => {
    return (
      <Pressable onPress={() => selectedOnPress(item.tagLabel)}>
        <Tag
          tagLabel={item.tagLabel}
          tagColor={item.tagColor}
          tagIcon={item.tagIcon}
        >
          <Feather
            name="x-square"
            size={12}
            color="black"
            style={{ paddingTop: 2, paddingLeft: 2, paddingRight: 5 }}
          />
        </Tag>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedTags}
        keyExtractor={(item) => item.tagLabel}
        extraData={pressedTags}
        horizontal={true}
        renderItem={renderSelectedItem}
      />
      <View style={styles.addContainer}>
        <Text style={styles.title}>Add Tag</Text>
        <FlatList
          data={selectableTags}
          keyExtractor={(item) => item.tagLabel}
          horizontal={true}
          renderItem={renderSelectableItem}
        />
        <Divider style={{ paddingTop: 30 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  addContainer: {
    backgroundColor: "rgba(236, 236, 236, 0.8)",
  },
  title: {
    marginTop: 20,
    textAlign: "center",
  },
  createButton: {
    textAlign: "center",
    color: "rgb(52, 170,	220)",
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 20,
  },
});
