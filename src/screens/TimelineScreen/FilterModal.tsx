/* eslint-disable import/namespace */
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet } from "react-native";
import { Button, Divider } from "react-native-elements";

// import { convertToTag } from "../../components/Tags/Tag.utils";
// import { TagElement } from "../../components/Tags/TagElement";
import { Text, View } from "../../components/Themed";
import { VeggieLogNormalised } from "../../features/entity.types";
import { PhotoFilter } from "./PhotoFilter";
import { TagsFilterModal } from "./TagsFilterModal";

interface Props {
  isTimelineFiltered: boolean;
  setIsTimelineFiltered: React.Dispatch<React.SetStateAction<boolean>>;
  filteredLogs: VeggieLogNormalised[];
  setFilteredLogs: React.Dispatch<React.SetStateAction<VeggieLogNormalised[]>>;
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  clearFilters: () => void;
}

export const FilterModal = ({
  isTimelineFiltered,
  setIsTimelineFiltered,
  filteredLogs,
  setFilteredLogs,
  selectedFilters,
  setSelectedFilters,
  clearFilters,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [logsFilteredByTag, setlogsFilteredByTag] = useState<
    VeggieLogNormalised[]
  >([]);
  const [logsFilteredByPics, setlogsFilteredByPics] = useState<
    VeggieLogNormalised[]
  >([]);

  // useEffect(() => {
  //   const listToDisplay = selectedFilters.map((tagName: string) =>
  //     convertToTag(tagName)
  //   );
  //   setFilteredTagsList(listToDisplay);
  // }, [selectedFilters]);

  useEffect(() => {
    const mergedArray = [...logsFilteredByTag, ...logsFilteredByPics];
    setFilteredLogs(mergedArray);
  }, [logsFilteredByTag, logsFilteredByPics]);

  const closeFilterModal = () => {
    setModalVisible(false);
  };

  // const renderTags = ({ item }: { item: Tag }) => {
  //   return <TagElement tag={item} hideIcon />;
  // };

  const con = () => {
    console.log(
      "*************************************************************************************"
    );
    console.log("selectedFilters", selectedFilters);
    console.log("filteredTagsList", logsFilteredByTag);
    console.log("filteredPicsList", logsFilteredByPics);
    // console.log("filteredLogs", filteredLogs);
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Button title="con" onPress={con} />
            <View style={{ flexDirection: "row" }}>
              <Pressable onPress={clearFilters}>
                <Text style={styles.categorySelector}>None</Text>
              </Pressable>
              <View style={{ marginLeft: 200, justifyContent: "flex-end" }}>
                {!isTimelineFiltered && (
                  <FontAwesome5 name="check" size={24} color="green" />
                )}
              </View>
            </View>
            <Divider color="black" />
            <View
              style={{ flexDirection: "row", maxHeight: 50, maxWidth: 100 }}
            >
              <TagsFilterModal
                setIsTimelineFiltered={setIsTimelineFiltered}
                filteredLogs={filteredLogs}
                setFilteredLogs={setFilteredLogs}
                setlogsFilteredByTag={setlogsFilteredByTag}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                clearFilters={clearFilters}
                closeFilterModal={closeFilterModal}
              />
              <View style={{ maxHeight: 30 }}>
                {/* <FlatList
                  data={logsFilteredByTag}
                  keyExtractor={(item) => item.tagLabel}
                  horizontal
                  renderItem={renderTags}
                /> */}
              </View>
              <View style={{ marginLeft: 50, justifyContent: "flex-end" }}>
                <AntDesign name="right" size={24} color="black" />
              </View>
            </View>
            <Divider />
            <PhotoFilter
              setIsTimelineFiltered={setIsTimelineFiltered}
              setlogsFilteredByPics={setlogsFilteredByPics}
            />
            <Divider />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Accept Filters</Text>
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
