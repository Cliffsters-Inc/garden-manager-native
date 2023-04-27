import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { bedSelectors } from "../../features/bed/bed.slice";
import {
  filterByBed,
  filterByGarden,
  resetDateFilters,
} from "../../features/Filters/filter.slice";
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
  const gardensList = gardens.map(({ name }) => name);
  const logsByLocation = useAppSelector(
    (state) => state.filters.logsByLocation
  );
  const [modalVisible, setModalVisible] = useState(false);
  const garden = selectedLocations.garden ? selectedLocations.garden : "";
  const bed = selectedLocations.bed ? selectedLocations.bed : "";

  let displayWarning = false;
  if (
    (garden !== "" && logsByLocation.length === 0) ||
    (bed !== "" && logsByLocation.length === 0)
  ) {
    displayWarning = true;
  } else {
    displayWarning = false;
  }

  const filterGarden = (gardenName: string) => {
    const logs = [...globalLogs];
    setSelectedLocations({ ...selectedLocations, garden: gardenName });
    dispatch(filterByGarden({ logs, gardenName }));
  };

  const bedsList: string[] = useAppSelector((state) => {
    const selectedGarden = gardens.find((gar) => gar.name === garden);
    const beds = selectedGarden?.beds ?? [];
    if (beds) {
      return bedSelectors.selectByIds(state, beds).map(({ name }) => name);
    }
    return [];
  });

  const filterBed = (bedName: string) => {
    const logs = [...globalLogs];
    setSelectedLocations({ ...selectedLocations, bed: bedName });
    dispatch(filterByBed({ logs, garden, bedName }));
  };

  const selectingGarden = garden === "";
  const area = ({ item }: { item: string }) => (
    <Pressable
      onPress={() => (selectingGarden ? filterGarden(item) : filterBed(item))}
    >
      <Text style={styles.listItem}>{item}</Text>
    </Pressable>
  );

  const resetFilter = () => {
    setSelectedLocations({ garden: null, bed: null });
    dispatch(resetDateFilters());
  };

  const Warning = () =>
    displayWarning ? (
      <Text style={styles.warning}>Selected area does not contain logs.</Text>
    ) : null;

  const FilterBy = () => (
    <Text style={styles.filterBy}>
      Filter by {garden} {selectedLocations.bed && `& ${bed}`}
    </Text>
  );

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
      style={{ marginLeft: 15 }}
      horizontal
    />
  );

  return (
    <View>
      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <FlatList
              data={selectingGarden ? gardensList : bedsList}
              keyExtractor={(name) => name}
              renderItem={area}
            />
            <Warning />
            <FilterBy />
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
            <Pressable style={styles.button} onPress={resetFilter}>
              <Text style={styles.buttonText}>Reset Filter</Text>
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
    fontSize: 18,
  },
});
