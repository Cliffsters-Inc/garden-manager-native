import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { VeggieInfo } from "../features/entity.types";
import { Text, View } from "./Themed";

type Props = {
  veggieInfos: VeggieInfo[];
  addHandler?: (veggieInfo: VeggieInfo) => void;
  navigationHandler?: (veggieInfo: VeggieInfo) => void;
};

export const VeggieInfoList = ({
  veggieInfos,
  addHandler,
  navigationHandler,
}: Props) => {
  return (
    <FlatList
      data={veggieInfos}
      keyExtractor={(item) => item.id}
      style={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.veggieContainer}
          onPress={() => navigationHandler && navigationHandler(item)}
          disabled={!navigationHandler}
        >
          <View style={styles.veggieL}>
            {"image" in item && (
              <Image style={styles.img} source={{ uri: item.image }} />
            )}
            <Text style={{ color: "green", fontWeight: "bold" }}>
              {item.name}
            </Text>
          </View>
          <View style={styles.veggieR}>
            <Text style={{ color: "gray" }}>
              {"growSeason" in item &&
                `${item.growSeason.from} - ${item.growSeason.to}   `}
            </Text>
            {addHandler && (
              <Button
                title="Add"
                testID={`${item.name}-add-btn`}
                onPress={() => addHandler(item)}
              />
            )}
            {navigationHandler && <FontAwesome5 name="angle-right" size={12} />}
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "100%",
  },
  veggieContainer: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  veggieL: {
    flexDirection: "row",
    alignItems: "center",
  },
  veggieR: {
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginRight: 10,
  },
});
