/* eslint-disable import/namespace */
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";

import { convertToTag } from "../../components/Tags/Tag.utils";
import { TagElement } from "../../components/Tags/TagElement";
import { Text } from "../../components/Themed";
import { Tag, VeggieLogNormalised } from "../../features/entity.types";
import { logSelectors } from "../../features/log/log.slice";
import { useAppSelector } from "../../store";

interface Props {
  setLogsFilteredByTag: React.Dispatch<
    React.SetStateAction<VeggieLogNormalised[]>
  >;
  tagsToFilter: string[];
  setTagsToFilter: React.Dispatch<React.SetStateAction<string[]>>;
  clearFilters: () => void;
}

export const TagsFilterModal = ({
  setLogsFilteredByTag,
  tagsToFilter,
  setTagsToFilter,
  clearFilters,
}: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const globalLogs = useAppSelector(logSelectors.selectAll);

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

  const renderTags = ({ item }: { item: Tag }) => {
    const toggleTag = () => {
      const alreadySelected = tagsToFilter.includes(item.tagLabel);
      if (!alreadySelected) {
        setTagsToFilter([...tagsToFilter, item.tagLabel]);
      } else {
        const updatedArr = tagsToFilter.filter(
          (filter) => filter !== item.tagLabel
        );
        setTagsToFilter(updatedArr);
      }
    };

    const handleTagPress = () => {
      toggleTag();
    };

    const checkIfSelected = () => {
      return tagsToFilter.includes(item.tagLabel);
    };

    return (
      <Pressable onPress={handleTagPress}>
        <TagElement tag={item} />
        <View
          style={{
            marginLeft: 200,
            justifyContent: "flex-start",
          }}
        >
          {checkIfSelected() && (
            <FontAwesome5 name="check" size={24} color="black" />
          )}
        </View>
      </Pressable>
    );
  };

  const filterByTags = () => {
    const logsToFilter = [...globalLogs];
    const logsFilteredByTag = logsToFilter.filter((log) =>
      log.payloadTags.some((tag) => {
        return tagsToFilter.includes(tag.tagLabel);
      })
    );
    setLogsFilteredByTag(logsFilteredByTag);
    console.log("**filteredList", logsFilteredByTag);
  };

  const resetAndGoBack = () => {
    //fix below. See Asana subtask for TimlineFilters.
    clearFilters();
    setModalVisible(!modalVisible);
  };

  const filterAndGoBack = () => {
    filterByTags();
    setModalVisible(!modalVisible);
  };

  const con = () => {
    console.log("tagsToFilter", tagsToFilter);
    console.log("globalLogs", globalLogs);
    // console.log("isSelected", isSelected);
    // console.log("tagSelected", tagSelected);
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
              onPress={resetAndGoBack}
              style={{
                fontSize: 20,
              }}
            >
              Back
            </Text>
            <Text
              onPress={filterAndGoBack}
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
                data={listTagsInLogs()}
                keyExtractor={(item) => item.tagLabel}
                renderItem={renderTags}
              />
            </View>
            <Button title="con" onPress={con} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={resetAndGoBack}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
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
