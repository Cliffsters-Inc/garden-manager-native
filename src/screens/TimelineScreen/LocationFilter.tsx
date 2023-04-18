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
      <Text style={styles.listItem}>{item}</Text>
    </Pressable>
  );

  const resetFilter = () => {
    setBedIds([]);
    setSelectedLocations({ garden: null, bed: null });
    dispatch(setLogsByLocation([]));
    setDisplayWarning(false);
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
      <Text style={styles.warning}>Selected area does not contain logs.</Text>
    ) : null;

  const locations = [garden, bed];
  const locationItem = ({ item }: { item: string }) => (
    <Text style={styles.text}>{item}</Text>
  );
  const seperator = () =>
    garden && bed !== "" ? <Text style={styles.text}> & </Text> : <Text />;
  const renderedList = (
    <FlatList
      data={locations}
      renderItem={locationItem}
      ItemSeparatorComponent={seperator}
      style={{ marginLeft: 20 }}
      horizontal
    />
  );

  const FilterBy = () => (
    <Text style={styles.filterBy}>
      Filter by {garden} {selectedLocations.bed && `& ${bed}`}
    </Text>
  );

  return (
    <View>
      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <FlatList
              data={displayGardens ? gardensList : bedsList}
              keyExtractor={(name) => name}
              renderItem={area}
            />
            <Warning />
            <FilterBy />
            {/* <Button title="con" onPress={con} /> */}
            <Pressable style={styles.button} onPress={resetFilter}>
              <Text style={styles.buttonText}>Reset Filter</Text>
            </Pressable>
            <Pressable
              style={
                !displayWarning
                  ? styles.button
                  : [styles.button, styles.buttonDisabled]
              }
              onPress={() => setModalVisible(!modalVisible)}
              disabled={displayWarning}
            >
              <Text style={styles.buttonText}>Filter Locations</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <RangeSelector
        name="Location"
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
  buttonDisabled: {
    opacity: 0.3,
    // backgroundColor: "#ADD8E6",
    // backgroundColor: "#F0F8FF",
    // backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  listItem: {
    marginBottom: 15,
    padding: 5,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#D3D3D3",
  },
  warning: {
    color: "red",
    fontSize: 15,
    marginTop: 10,
  },
  filterBy: {
    fontSize: 20,
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
  },
});
