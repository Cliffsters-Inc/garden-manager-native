import React from "react";
import { Text, View } from "./Themed";
import { FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Veggie, VeggieInfo } from "../services/types";
import { format } from "date-fns";
import { Button } from "react-native";

type Props = {
  veggies: VeggieInfo[] | Veggie[];
  navigationHandler?: (veggie: any) => void;
  addHandler?: (veggieInfoId: string) => void;
};

export const VeggieList = ({
  veggies,
  navigationHandler,
  addHandler,
}: Props) => {
  return (
    <FlatList<VeggieInfo | Veggie>
      data={veggies}
      keyExtractor={(item) => item.id}
      style={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.veggieContainer}
          onPress={() => navigationHandler && navigationHandler(item)}
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
            {addHandler && (
              <Button title="Add" onPress={() => addHandler(item.id)} />
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
