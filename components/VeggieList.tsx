import React from "react";
import { Text, View } from "./Themed";
import { FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { mockData } from "../services/mockData";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";

type Props = {
  navigation: NavigationProp<any>; // ! get typed properly
};

export const VeggieList = ({ navigation }: Props) => {
  const { veggies } = mockData;

  return veggies ? (
    <FlatList
      style={styles.container}
      data={veggies}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.plantContainer]}
          onPress={() =>
            navigation.navigate("VeggieInfoScreen", {
              title: item.name,
              veggieInfo: item,
            })
          }
        >
          <View style={styles.plantL}>
            <Image style={styles.img} source={{ uri: item.image }} />
            <Text style={{ color: "green", fontWeight: "bold" }}>
              {item.name}
            </Text>
          </View>
          <View style={styles.plantR}>
            <Text style={{ color: "gray" }}>
              {`${item.growSeason.from} - ${item.growSeason.to}   `}
              <FontAwesome5 name="angle-right" size={12} />
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "100%",
  },
  plantContainer: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  plantL: {
    flexDirection: "row",
    alignItems: "center",
  },
  plantR: {
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
