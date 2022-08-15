/* eslint-disable import/namespace */
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";

import { convertToTag, DefaultTagsList } from "../../components/Tags/Tag.utils";
import { TagElement } from "../../components/Tags/TagElement";
import { Text } from "../../components/Themed";
import { Tag, VeggieLogNormalised } from "../../features/entity.types";
import { logSelectors } from "../../features/log/log.slice";
import { useAppSelector } from "../../store";

interface Props {
  setIsTimelineFiltered: React.Dispatch<React.SetStateAction<boolean>>;
  setlogsFilteredByTag: React.Dispatch<
    React.SetStateAction<VeggieLogNormalised[]>
  >;
  tagsToFilter: string[];
  setTagsToFilter: React.Dispatch<React.SetStateAction<string[]>>;
  clearFilters: () => void;
  closeFilterModal: () => void;
}

export const TagsFilterModal = ({
  setIsTimelineFiltered,
  setlogsFilteredByTag,
  tagsToFilter,
  setTagsToFilter,
  clearFilters,
}: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const globalLogs = useAppSelector(logSelectors.selectAll);
  const [combinedTagsList, setCombinedTagsList] = useState<Tag[]>([]);

  useEffect(() => {
    const combinedTags: Tag[] = DefaultTagsList.map((tag: string) =>
      convertToTag(tag)
    );
    setCombinedTagsList(combinedTags);
  }, []);

  const renderTags = ({ item }: { item: Tag }) => {
    const selectTag = () => {
      const alreadySelected = tagsToFilter.includes(item.tagLabel);
      if (!alreadySelected) {
        console.log("adding new tag filter");
        setTagsToFilter([...tagsToFilter, item.tagLabel]);
      } else {
        const tempArr = tagsToFilter.filter(
          (filter) => filter !== item.tagLabel
        );
        setTagsToFilter(tempArr);
        console.log("udplicateTest");
        console.log("temp", tempArr);
      }
    };

    const handleTagPress = () => {
      selectTag();
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
    const filteredList = logsToFilter.filter((log) =>
      log.payloadTags.some((tag) => {
        return tagsToFilter.includes(tag.tagLabel);
      })
    );
    setlogsFilteredByTag(filteredList);
    console.log("**filteredList", filteredList);
  };

  const resetAndGoBack = () => {
    clearFilters();
    setModalVisible(!modalVisible);
  };

  const filterAndGoBack = () => {
    filterByTags();
    setIsTimelineFiltered(true);
    setModalVisible(!modalVisible);
  };

  const con = () => {
    console.log("tagsToFilter", tagsToFilter);
    // console.log("test", test); console.log("isSelected", isSelected);
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
                data={combinedTagsList}
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
        style={[styles.button, styles.buttonOpen]}
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
    backgroundColor: "blue",
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
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
