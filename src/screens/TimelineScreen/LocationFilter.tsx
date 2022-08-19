/* eslint-disable import/namespace */
import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import { Text, View } from "../../components/Themed";
import { bedSelectors } from "../../features/bed/bed.slice";
import {
  BedNormalised,
  VeggieLogNormalised,
} from "../../features/entity.types";
import { gardenSelectors } from "../../features/garden/garden.slice";
import { logSelectors } from "../../features/log/log.slice";
import { useAppSelector } from "../../store";

interface Props {
  setIsTimelineFiltered: React.Dispatch<React.SetStateAction<boolean>>;
  setLogsFilteredByLocation: React.Dispatch<
    React.SetStateAction<VeggieLogNormalised[]>
  >;
}

export const LocationFilter = ({
  setLogsFilteredByLocation,
  setIsTimelineFiltered,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const globalLogs = useAppSelector(logSelectors.selectAll);
  const gardens = useAppSelector(gardenSelectors.selectAll);

  const gardenNamesList = gardens.map((garden) => garden.name);
  const [isDisplayingBedList, setIsDisplayingBedlist] =
    useState<boolean>(false);

  const [selectedGardenId, setSelectedGardenId] = useState("");
  const selectedBeds = useAppSelector((state) =>
    bedSelectors.selectByGarden(state, selectedGardenId)
  );

  const [filterByList, setFilterByList] = useState<string[]>([]);

  const createGardenBedList = (gardenName: string) => {
    let selectedGardenId: string;
    gardens.filter((garden) => {
      if (garden.name === gardenName) {
        setSelectedGardenId(garden.id);
      }
      console.log("**garden", selectedGardenId);
    });
  };

  const filterByGarden = (gardenName: string) => {
    setFilterByList([gardenName]);
    const logsToFilter = [...globalLogs];
    const filteredList = logsToFilter.filter((log) => {
      const filteredLocation =
        log.location?.gardenTitle === gardenName ? log : null;
      return filteredLocation;
    });
    console.log("filteredList", filteredList);
    createGardenBedList(gardenName);
    setIsDisplayingBedlist(true);
    setIsTimelineFiltered(true);
    setLogsFilteredByLocation(filteredList);
  };

  const filterByBed = (bedName: string) => {
    setFilterByList([...filterByList, bedName]);
    const logsToFilter = [...globalLogs];
    const filteredList = logsToFilter.filter((log) => {
      return (
        log.location?.gardenTitle === filterByList[0] &&
        log.location?.bedTitle === bedName
      );
    });
    setLogsFilteredByLocation(filteredList);
    console.log("test", filterByList[0], bedName);
    console.log("filteredList bed", filteredList);
  };

  const renderGardens = ({ item }: { item: string }) => (
    <Pressable onPress={() => filterByGarden(item)}>
      <Text style={styles.modalText}>{item}</Text>
    </Pressable>
  );

  const renderBeds = ({ item }: { item: BedNormalised }) => (
    <Pressable onPress={() => filterByBed(item.name)}>
      <Text style={styles.modalText}>{item.name}</Text>
    </Pressable>
  );

  const con = () => {
    console.log("selectedBeds", selectedBeds);
    console.log("isDisplayingBedList", isDisplayingBedList);
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {!isDisplayingBedList ? (
              <FlatList
                data={gardenNamesList}
                keyExtractor={(index) => index}
                renderItem={renderGardens}
              />
            ) : (
              <FlatList
                data={selectedBeds}
                keyExtractor={(index) => index.id}
                renderItem={renderBeds}
              />
            )}
            <Text>Filter by {filterByList}</Text>
            <Button title="con" onPress={con} />
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
        style={styles.buttonOpen}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Location</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
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
    textAlign: "center",
    color: "black",
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
  },
  textStyle: {
    // color: "white",
    fontWeight: "bold",
    // textAlign: "left",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
