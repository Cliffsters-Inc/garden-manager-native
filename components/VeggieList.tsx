import React from "react";
import { Text, View } from "./Themed";
import { FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { VeggieNormalised } from "../services/types";
import { format } from "date-fns";

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
              <View style={{ flexDirection: "column", marginRight: 15 }}>
                {"sowDate" in item && item.sowDate && (
                  <Text style={{ color: "gray", textAlign: "right" }}>
                    Sown: {format(new Date(item.sowDate), "dd/MM/yy")}
                  </Text>
                )}
                {"harvestDate" in item && item.harvestDate && (
                  <Text style={{ color: "gray", textAlign: "right" }}>
                    Harvest: {format(new Date(item.harvestDate), "dd/MM/yy")}
                  </Text>
                )}
              </View>

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
