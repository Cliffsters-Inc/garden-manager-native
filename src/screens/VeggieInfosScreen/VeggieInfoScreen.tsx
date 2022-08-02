import { AntDesign } from "@expo/vector-icons";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React from "react";
import { Image, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { VeggiesTabParamList } from "../../navigation/navigation.types";

export const VeggieInfoScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<VeggiesTabParamList, "VeggieInfoScreen">) => {
  const { veggieInfo } = route.params;

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Image style={styles.img} source={{ uri: veggieInfo.image }} />
        <View style={{ alignItems: "flex-end" }}>
          <AntDesign
            name={veggieInfo.starred ? "star" : "staro"}
            size={25}
            style={{ padding: 5 }}
            color="#f3f704"
          />

          <Text>
            {veggieInfo?.growSeason.from} - {veggieInfo?.growSeason.from}
          </Text>
        </View>
      </View>
      <Text style={styles.title}>{veggieInfo.name}</Text>
      <Text>Description: {veggieInfo?.description}</Text>
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
