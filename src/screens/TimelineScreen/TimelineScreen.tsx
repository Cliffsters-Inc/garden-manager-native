import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import { View } from "../../components/Themed";
import { FilterModal } from "./FilterModal";
import { TimelineElement } from "./TimelineElement";

export const TimelineScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.filter}>
        <Pressable
          style={[styles.button]}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="filter" size={24} color="black" />
          <Text style={styles.buttonText}>Filters</Text>
        </Pressable>
        <FilterModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      </View>
      <View style={styles.timeline}>
        <TimelineElement />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filter: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  timeline: {
    flex: 15,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#D3D3D3",
    marginTop: 15,
    marginRight: 15,
    borderRadius: 20,
    padding: 1,
    width: 100,
  },
  buttonText: {
    marginLeft: 5,
    marginTop: 4,
  },
});
