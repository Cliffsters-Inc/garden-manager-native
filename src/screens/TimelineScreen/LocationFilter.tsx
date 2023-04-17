import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import { Text, View } from "../../components/Themed";
import { bedSelectors } from "../../features/bed/bed.slice";
import { setLogsByLocation } from "../../features/Filters/filter.slice";
import { gardenSelectors } from "../../features/garden/garden.slice";
import { logSelectors } from "../../features/log/log.slice";
import { useAppDispatch, useAppSelector } from "../../store";
import { RangeSelector } from "../FilterModal/RangeSelector";

export interface SelectedLocationsObj {
  garden: string | null;
  bed: string | null;
}

export const LocationFilter: React.FC<{
  selectedLocations: SelectedLocationsObj;
  setSelectedLocations: React.Dispatch<
    React.SetStateAction<SelectedLocationsObj>
  >;
}> = ({ selectedLocations, setSelectedLocations }) => {
  const dispatch = useAppDispatch();
  const globalLogs = useAppSelector(logSelectors.selectAll);
  const gardens = useAppSelector(gardenSelectors.selectAll);
  const [modalVisible, setModalVisible] = useState(false);
  const [displayWarning, setDisplayWarning] = useState(false);
  const [bedIds, setBedIds] = useState<string[]>([]);
  const garden = selectedLocations.garden ? selectedLocations.garden : "";
  const bed = selectedLocations.bed ? selectedLocations.bed : "";

  const filterByGarden = (gardenName: string) => {
    setSelectedLocations({ ...selectedLocations, garden: gardenName });
    const logs = [...globalLogs];
    const matchingLogs = logs
      .filter((log) => log.location?.gardenTitle === gardenName)
      .map(({ id }) => id);
    console.log("garden lodt", matchingLogs);
    if (matchingLogs.length > 0) {
      dispatch(setLogsByLocation(matchingLogs));
      createGardenId(gardenName);
      setDisplayWarning(false);
    } else {
      setDisplayWarning(true);
    }
  };

  const filterByBed = (bedName: string) => {
    setSelectedLocations({ ...selectedLocations, bed: bedName });
    const logs = [...globalLogs];
    const matchingLogs = logs
      .filter(
        (log) =>
          log.location?.gardenTitle === selectedLocations.garden &&
          log.location?.bedTitle === bedName
      )
      .map(({ id }) => id);
    if (matchingLogs.length > 0) {
      dispatch(setLogsByLocation(matchingLogs));
      setDisplayWarning(false);
    } else {
      setDisplayWarning(true);
    }
  };

  const displayGardens = !(bedIds.length > 0);
  const area = ({ item }: { item: string }) => (
    <Pressable
      onPress={() =>
        displayGardens ? filterByGarden(item) : filterByBed(item)
      }
    >
      <Text style={styles.modalText}>{item}</Text>
    </Pressable>
  );

  const resetFilter = () => {
    setBedIds([]);
    setSelectedLocations({ garden: null, bed: null });
    dispatch(setLogsByLocation([]));
  };

  const con = () => {
    console.log("selectedLocations", selectedLocations);
    console.log("bedsList", bedsList);
  };

  const gardensList = gardens.map(({ name }) => name);

  const createGardenId = (gardenName: string) => {
    const garden = gardens.find((garden) => garden.name === gardenName);
    setBedIds(garden?.beds ?? []);
  };

  const bedsList: string[] = useAppSelector((state) => {
    if (bedIds) {
      return bedSelectors.selectByIds(state, bedIds).map(({ name }) => name);
    }
    return [];
  });

  const Warning = () =>
    displayWarning ? (
      <View>
        <Text>Selected area does not contain logs.</Text>
      </View>
    ) : null;

  const locations = [garden, bed];
  const locationsText = ({ item }: { item: string }) => (
    //why arnt styles below working??
    <Text>{item}</Text>
  );
  const seperator = () => (garden && bed !== "" ? <Text> & </Text> : <Text />);
  const renderedList = (
    <FlatList
      data={locations}
      renderItem={locationsText}
      ItemSeparatorComponent={seperator}
      horizontal
    />
  );

  return (
    <View>
      <View style={styles.centeredView}>
        <Modal animationType="slide" visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FlatList
                data={displayGardens ? gardensList : bedsList}
                keyExtractor={(name) => name}
                renderItem={area}
              />
              <Warning />
              <Text style={{ fontSize: 20 }}>
                Filter by {garden} {selectedLocations.bed && `& ${bed}`}
              </Text>
              <Button title="con" onPress={con} />
              <Pressable
                style={[styles.button, styles.buttonClose, { marginBottom: 5 }]}
                onPress={resetFilter}
              >
                <Text style={styles.textStyle}>Reset Filter</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <RangeSelector
        name="Location"
        handlePress={() => setModalVisible(true)}
        list={renderedList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    marginHorizontal: 40,
  },
  modalView: {
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
  list: {
    fontSize: 20,
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
    fontSize: 20,
  },
});
