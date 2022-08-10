/* eslint-disable import/namespace */
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet } from "react-native";
import { Button, Divider } from "react-native-elements";

import { convertToTag } from "../../components/Tags/Tag.utils";
import { TagElement } from "../../components/Tags/TagElement";
import { Text, View } from "../../components/Themed";
import { Tag, VeggieLogNormalised } from "../../features/entity.types";
import { TagsFilterModal } from "./TagsFilterModal";

interface Props {
  showFilteredList: () => void;
  filterLogs: (arr: VeggieLogNormalised[]) => void;
  selectedFilters: string[];
  addFilter: (newFilter: string) => void;
  clearFilters: () => void;
  isFiltered: boolean;
}

export const FilterModal = ({
  showFilteredList,
  filterLogs,
  selectedFilters,
  addFilter,
  clearFilters,
  isFiltered,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredTagsList, setFilteredTags] = useState<any[]>([]);

  // useEffect(() => {
  //   const tagsProps: Tag[] = selectedFilters.map((filterName: string) => {
  //     convertToTag(filterName);
  //   });
  //   const filteredTagElements = tagsProps.map((tagProp) => {
  //     return <TagElement tag={tagProp} />;
  //   });
  //   setFilteredTags(filteredTagElements);
  // }, [selectedFilters]);

  useEffect(() => {
    const listToDisplay = selectedFilters.map((tagName: string) =>
      convertToTag(tagName)
    );
    setFilteredTags(listToDisplay);
  }, [selectedFilters]);
  console.log("modalRender", filteredTagsList);

  const closeFilterModal = () => {
    setModalVisible(false);
  };

  const renderTags = ({ item }: { item: Tag }) => {
    return <TagElement tag={item} hideIcon />;
  };

  const con = () => {
    console.log("selectedFilters", selectedFilters);
    console.log("filteredTagsList", filteredTagsList);
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" visible={modalVisible}>
        <Button title="con" onPress={con} />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: "row" }}>
              <Pressable onPress={clearFilters}>
                <Text style={styles.categorySelector}>None</Text>
              </Pressable>
              <View style={{ marginLeft: 200, justifyContent: "flex-end" }}>
                {!isFiltered && (
                  <FontAwesome5 name="check" size={24} color="green" />
                )}
              </View>
            </View>
            <Divider color="black" />
            <View
              style={{ flexDirection: "row", maxHeight: 50, maxWidth: 100 }}
            >
              <TagsFilterModal
                showFilteredList={showFilteredList}
                filterLogs={filterLogs}
                selectedFilters={selectedFilters}
                addFilter={addFilter}
                clearFilters={clearFilters}
                closeFilterModal={closeFilterModal}
              />
              <View style={{ maxHeight: 30 }}>
                <FlatList
                  data={filteredTagsList}
                  keyExtractor={(item) => item.tagLabel}
                  horizontal
                  renderItem={renderTags}
                />
              </View>
              <View style={{ marginLeft: 50, justifyContent: "flex-end" }}>
                <AntDesign name="right" size={24} color="black" />
              </View>
            </View>
            <Divider />
            <Text style={styles.categorySelector}>Date</Text>
            <Divider />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="filter" size={24} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    // justifyContent: "center",
    alignItems: "center",
    height: 400,
    marginBottom: 100,
    // marginTop: 22,
  },
  modalView: {
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
    backgroundColor: "#F194FF",
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
