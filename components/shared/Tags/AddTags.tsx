import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable } from "react-native";
import { Divider } from "react-native-elements";
import { pressedTagsContext } from "../../../services/context";
import { Text, View } from "../../Themed";

export const AddTags = () => {
  const [selectableTags, setSelectableTags] = useState([]);
  const { pressedTags, setPressedTags } = useContext(pressedTagsContext);
  const [combinedTagsList, setCombinedTagsList] = useState([]);
  const [pressedTagObjectState, setPressedTagObjectState] = useState([]);

  useEffect(() => {
    const combinedTags: any = defaultTags.map((tag) => convertToTag(tag));
    setCombinedTagsList(combinedTags);
  }, []);

  useEffect(() => {
    const filteredList = combinedTagsList.filter((tag: any) => {
      return !pressedTags.some((t: any) => t.tagLabel === tag?.tagLabel);
    });
    console.log("filteredList: ", filteredList);
    setSelectableTags(filteredList);
  }, [pressedTags, combinedTagsList]);

  const selectableOnPress = (
    tag: string
    // setPressedTags: Dispatch<typeof tag[]>
  ) => {
    console.log("selectableOnPress");
    const pressedTagObject = AddTagToList(pressedTags, tag);
    setPressedTagObjectState(pressedTagObject);
    setPressedTags(pressedTagObject);
    // setPressedTags(AddTagToList(pressedTags, tag));
  };

  const renderSelectableItem = ({ item }: any) => {
    return (
      <Pressable onPress={() => selectableOnPress(item.tagLabel)}>
        {/* <Tag
          tagLabel={item.tagLabel}
          tagColor={item.tagColor}
          extraStyleProps={{ label: { paddingRight: 15 } }}
        /> */}
      </Pressable>
    );
  };

  return (
    <View style={styles.addContainer}>
      <Text style={styles.title}>Add Tag</Text>
      <FlatList
        data={selectableTags}
        keyExtractor={() => nanoid()}
        horizontal={true}
        renderItem={renderSelectableItem}
      />

      <Divider style={{ paddingTop: 30 }} />
    </View>
  );
};
