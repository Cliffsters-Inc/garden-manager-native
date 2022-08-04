import { Feather } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";

import { pressedTagsContext } from "../../features/context";
import { Tag } from "../../features/entity.types";
import { Text, View } from "../Themed";
import {
  AddTagToList,
  convertToTag,
  DefaultTagsList,
  RemoveTagFromList,
} from "./Tag.utils";
import { TagElement } from "./TagElement";

export const AddTags = () => {
  const appContext = useContext(pressedTagsContext);
  const pressedTags = appContext?.pressedTags;
  const setPressedTags = appContext?.setPressedTags;

  const [combinedTagsList, setCombinedTagsList] = useState<Tag[]>([]);
  const [selectableTags, setSelectableTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  useEffect(() => {
    const combinedTags: Tag[] = DefaultTagsList.map((tag) => convertToTag(tag));
    setCombinedTagsList(combinedTags);
  }, []);

  useEffect(() => {
    const filteredList = combinedTagsList.filter((tag: Tag) => {
      return !pressedTags!.some((t: Tag) => t.tagLabel === tag?.tagLabel);
    });
    setSelectableTags(filteredList);
  }, [pressedTags, combinedTagsList]);

  const filterList = (tagObject: Tag[]) => {
    if (tagObject.length > 0) {
      setSelectedTags(pressedTags!);
    }
  };

  useEffect(() => {
    filterList(pressedTags!);
  }, [pressedTags]);

  const selectableOnPress = (tag: string) => {
    const pressedTagObject = AddTagToList(pressedTags!, tag);
    setPressedTags!(pressedTagObject);
  };

  const selectedOnPress = (tag: string) => {
    const removeTag = RemoveTagFromList(pressedTags!, tag);
    setPressedTags!([...removeTag]);
  };

  const renderSelectableItem = ({ item }: { item: Tag }) => {
    return (
      <Pressable onPress={() => selectableOnPress(item.tagLabel)}>
        <TagElement
          tag={item}
          extraStyleProps={{ label: { paddingRight: 15 } }}
        />
      </Pressable>
    );
  };

  const renderSelectedItem = ({ item }: { item: Tag }) => {
    return (
      <Pressable onPress={() => selectedOnPress(item.tagLabel)}>
        <TagElement tag={item}>
          <Feather
            name="x-square"
            size={12}
            color="black"
            style={{ paddingTop: 2, paddingLeft: 2, paddingRight: 5 }}
          />
        </TagElement>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedTags}
        keyExtractor={(item) => item.tagLabel}
        extraData={pressedTags}
        horizontal
        renderItem={renderSelectedItem}
      />
      <View style={styles.addContainer}>
        <Text style={styles.title}>Add Tag</Text>
        <FlatList
          data={selectableTags}
          keyExtractor={(item) => item.tagLabel}
          horizontal
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
