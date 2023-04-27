import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, View } from "react-native";

import { convertToTag } from "../../components/Tags/Tag.utils";
import { TagElement } from "../../components/Tags/TagElement";
import { Text } from "../../components/Themed";
import { Tag } from "../../features/entity.types";
import { filterByTags } from "../../features/Filters/filter.slice";
import { logSelectors } from "../../features/log/log.slice";
import { useAppDispatch, useAppSelector } from "../../store";
import { RangeSelector } from "../FilterModal/RangeSelector";

export const TagsFilter: React.FC<{
  selectedTags: string[];
  setSelectedTags: (value: string[]) => void;
}> = ({ selectedTags, setSelectedTags }) => {
  const dispatch = useAppDispatch();
  const globalLogs = useAppSelector(logSelectors.selectAll);
  const [modalVisible, setModalVisible] = useState(false);

  const listTagsInLogs = () => {
    const logsWithTags = [...globalLogs]
      .filter((log) => log.payloadTags.length > 0)
      .flatMap((log) => log.payloadTags);

    const uniqueTagObjs = Array.from(
      new Set(logsWithTags.map((tag) => tag.tagLabel))
    );
    const tagsInLogs = uniqueTagObjs.map((label) => convertToTag(label));
    return tagsInLogs;
  };

  const toggleTag = (item: Tag, selected: boolean) => {
    if (!selected) {
      setSelectedTags([...selectedTags, item.tagLabel]);
    } else {
      const newList = selectedTags.filter(
        (tagName) => tagName !== item.tagLabel
      );
      setSelectedTags(newList);
    }
  };

  const usedTags = listTagsInLogs();
  const parentTags = selectedTags.map((tagLabel) => convertToTag(tagLabel));
  const tag = (
    { item }: { item: Tag },
    displayType: "selectable" | "display"
  ) => {
    const selected = selectedTags.includes(item.tagLabel);
    return displayType === "selectable" ? (
      <Pressable onPress={() => toggleTag(item, selected)}>
        <View style={styles.listContainer}>
          <View style={{ marginRight: 30, minWidth: 120 }}>
            <TagElement tag={item} />
          </View>
          {selected && <FontAwesome5 name="check" size={24} color="black" />}
        </View>
      </Pressable>
    ) : (
      <TagElement tag={item} hideIcon />
    );
  };

  const filter = () => {
    const logs = [...globalLogs];
    dispatch(filterByTags({ logs, selectedTags }));
    setModalVisible(!modalVisible);
  };

  const renderedList = (
    <View>
      <FlatList
        data={parentTags}
        keyExtractor={(item) => item.tagLabel}
        renderItem={({ item }) => tag({ item }, "display")}
        horizontal
      />
    </View>
  );

  return (
    <View>
      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <FlatList
              data={usedTags}
              keyExtractor={(item) => item.tagLabel}
              renderItem={({ item }) => tag({ item }, "selectable")}
            />
            <Pressable style={styles.button} onPress={filter}>
              <Text style={styles.buttonText}>Filter Tags</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => setSelectedTags([])}
            >
              <Text style={styles.buttonText}>Reset Filters</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <RangeSelector
        name="Tags"
        handlePress={() => setModalVisible(true)}
        list={renderedList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 40,
    marginBottom: 100,
  },
  modalView: {
    height: 400,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 150,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 5,
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  listContainer: {
    flexDirection: "row",
    minHeight: 25,
    minWidth: 175,
    margin: 10,
  },
});
