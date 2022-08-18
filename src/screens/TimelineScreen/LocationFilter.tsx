/* eslint-disable import/namespace */
import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import { Text, View } from "../../components/Themed";
import { VeggieLogNormalised } from "../../features/entity.types";
import { logSelectors } from "../../features/log/log.slice";
import { useAppSelector } from "../../store";

interface Props {
  setLogsFilteredByLocation: React.Dispatch<
    React.SetStateAction<VeggieLogNormalised[]>
  >;
}

export const LocationFilter = ({ setLogsFilteredByLocation }: Props) => {
  const globalLogs = useAppSelector(logSelectors.selectAll);
  const [modalVisible, setModalVisible] = useState(false);
  const locationList = ["frontyard", "1"];
  const [test, setTest] = useState<VeggieLogNormalised[]>([]);

  const filterByLocation = (locationName: string) => {
    const logsToFilter = [...globalLogs];
    const filteredList: VeggieLogNormalised[] = logsToFilter.filter((log) => {
      const filteredLocation =
        (log.location?.gardenTitle || log.location?.bedTitle) === locationName
          ? log
          : null;
      return filteredLocation;
    });
    console.log("mcFillyList", filteredList);
  };

  //   const filterByLocation = (locationName: string) => {
  //     const logsToFilter = [...globalLogs];
  //     const filteredList: any[] = logsToFilter.filter((log) => {
  //       const filteredLocations = log.location.some((location) => {
  //         return location.includes(locationName);
  //       });
  //       console.log("filLocs", filteredLocations);
  //       return filteredLocations;
  //     });
  //     setTest(filteredList);
  //   };

  const renderLocations = ({ item }: { item: string }) => (
    <Pressable onPress={() => filterByLocation(item)}>
      <Text style={styles.modalText}>{item}</Text>
    </Pressable>
  );

  const con = () => {
    console.log("test", test);
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              data={locationList}
              keyExtractor={(index) => index}
              renderItem={renderLocations}
            />
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
