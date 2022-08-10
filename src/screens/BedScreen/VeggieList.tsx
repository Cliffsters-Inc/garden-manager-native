import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../../components/Themed";
import { VeggieNormalised } from "../../features/entity.types";

type Props = {
  veggies: VeggieNormalised[];
  navigationHandler: (veggie: VeggieNormalised) => void;
};

export const VeggieList = ({ veggies, navigationHandler }: Props) => {
  return (
    <FlatList
      data={veggies}
      keyExtractor={(item) => item.id}
      style={styles.container}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={styles.veggieContainer}
            onPress={() => navigationHandler && navigationHandler(item)}
          >
            <View style={styles.veggieL}>
              {item.veggieInfo.image && (
                <Image
                  style={styles.img}
                  source={{ uri: item.veggieInfo.image }}
                />
              )}
              <Text style={{ color: "green", fontWeight: "bold" }}>
                {item.veggieInfo.name}
              </Text>
            </View>
            <View style={styles.veggieR}>
              <FontAwesome5 name="angle-right" size={12} />
            </View>
          </TouchableOpacity>
        );
      }}
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
