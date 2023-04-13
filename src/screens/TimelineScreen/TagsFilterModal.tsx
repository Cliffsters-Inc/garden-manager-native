import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";

import { convertToTag } from "../../components/Tags/Tag.utils";
import { TagElement } from "../../components/Tags/TagElement";
import { Text } from "../../components/Themed";
import { Tag } from "../../features/entity.types";
import { setLogsByTag } from "../../features/Filters/filter.slice";
import { logSelectors } from "../../features/log/log.slice";
import { useAppDispatch, useAppSelector } from "../../store";

export const TagsFilterModal: React.FC<{
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
  const usedTags = listTagsInLogs();

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
  const renderTags = ({ item }: { item: Tag }) => {
    const selected = selectedTags.includes(item.tagLabel);
    return (
      <Pressable onPress={() => toggleTag(item, selected)}>
        <TagElement tag={item} />
        <View
          style={{
            marginLeft: 200,
            justifyContent: "flex-start",
          }}
        >
          {selected && <FontAwesome5 name="check" size={24} color="black" />}
        </View>
      </Pressable>
    );
  };

  const filterByTags = () => {
    const logsToFilter = [...globalLogs];
    const logsFilteredByTag = logsToFilter.filter((log) =>
      log.payloadTags.some((tag) => {
        return selectedTags.includes(tag.tagLabel);
      })
    );
    const filteredIds = logsFilteredByTag.map((log) => log.id);
    dispatch(setLogsByTag(filteredIds));
    setModalVisible(!modalVisible);
    console.log("**filteredList", filteredIds);
  };

  const con = () => {
    console.log("tagsToFilter", selectedTags);
  };

  return (
    <View>
      <View style={styles.centeredView}>
        <Modal animationType="slide" visible={modalVisible}>
          <View
            style={{
              height: 100,
              justifyContent: "flex-end",
              backgroundColor: "green",
            }}
          >
            <Text
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                fontSize: 20,
              }}
            >
              Back
            </Text>
            <Text
              onPress={filterByTags}
              style={{
                fontSize: 20,
                marginLeft: "auto",
              }}
            >
              Filter
            </Text>
          </View>
          <View style={styles.modalView}>
            <View style={styles.list}>
              <FlatList
                data={usedTags}
                keyExtractor={(item) => item.tagLabel}
                renderItem={renderTags}
              />
            </View>
            <Button title="con" onPress={con} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setSelectedTags([])}
            >
              <Text style={styles.textStyle}>Reset Filters</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
      <Pressable
        style={styles.buttonOpen}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.categorySelector}>Tags</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    height: 400,
    width: 200,
    // marginTop: 22, backgroundColor: "red",
  },
  modalView: {
    // justifyContent: "center",
    alignItems: "center",

    height: "50%",
    width: "90%",
    margin: 20,
    // backgroundColor: "red",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  list: {
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
    width: "90%",
    // backgroundColor: "blue",
  },
  categorySelector: {
    fontSize: 20,
    marginTop: 30,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    // backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginTop: 50,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
