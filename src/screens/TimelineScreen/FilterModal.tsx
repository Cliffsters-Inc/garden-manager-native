/* eslint-disable import/namespace */
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";

import { Text, View } from "../../components/Themed";
import { VeggieLogNormalised } from "../../features/entity.types";
import { TagsFilterModal } from "./TagsFilterModal";

interface Props {
  showFilteredList: () => void;
  filterLogs: (arr: VeggieLogNormalised[]) => void;
  isFiltered: boolean;
}

export const FilterModal = ({
  showFilteredList,
  filterLogs,
  isFiltered,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const closeFilterModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.categorySelector}>None</Text>
              <View style={{ marginLeft: 200, justifyContent: "flex-end" }}>
                {!isFiltered && (
                  <FontAwesome5 name="check" size={24} color="green" />
                )}
              </View>
            </View>
            <Divider color="black" />
            <TagsFilterModal
              showFilteredList={showFilteredList}
              filterLogs={filterLogs}
              closeFilterModal={closeFilterModal}
            />
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
