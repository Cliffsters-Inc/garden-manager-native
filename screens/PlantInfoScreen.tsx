import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Image } from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Text, View } from "../components/Themed";
import { RootStackParamList } from "../types";

export const PlantInfoScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "PlantInfoScreen">) => {
  const { plantInfo } = route.params;

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Image style={styles.img} source={{ uri: plantInfo.image }} />
        <View style={{ alignItems: "flex-end" }}>
          <AntDesign
            name={plantInfo.starred ? "star" : "staro"}
            size={25}
            style={{ padding: 5 }}
            color="#f3f704"
          />

          <Text>
            {plantInfo?.growSeason.from} - {plantInfo?.growSeason.from}
          </Text>
        </View>
      </View>
      <Text style={styles.title}>{plantInfo.name}</Text>
      <Text>Description: {plantInfo?.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginRight: 10,
  },
});
