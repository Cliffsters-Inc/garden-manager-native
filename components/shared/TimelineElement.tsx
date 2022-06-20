import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { format } from "date-fns";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Timeline from "react-native-timeline-flatlist";
import { VeggieLog } from "../../services/types";
import { Text, View } from "../Themed";

type Props = {
  //Fix type any below****************************
  dataToMap: any[];
  // dataToMap: VeggieLog[]
};

export const TimelineElement = ({ dataToMap }: Props) => {
  const [showAllText, setShowAllText] = useState<{ [key: string]: boolean }>(
    {}
  );

  const assignIcon = (iconName: string) => {
    switch (iconName) {
      case "pests":
        return <Ionicons name="ios-bug-outline" size={20} color={"#FF5A33"} />;
      case "disease":
        return <FontAwesome5 name="virus" size={20} color={"#633c15"} />;
      case "sowed":
        return (
          <MaterialCommunityIcons
            name="seed-outline"
            size={20}
            color={"#B4CF66"}
          />
        );
      case "seedling":
        return <FontAwesome5 name="seedling" size={20} color="#44803F" />;
      case "generic":
        return <FontAwesome name="circle-o" size={20} color="black" />;
    }
  };

  const descriptionElement = (value: VeggieLog, i: string) => {
    const onPress = () => {
      setShowAllText((prev) => ({
        ...showAllText,
        [i]: !prev[i],
      }));
    };

    return (
      <Pressable onPress={onPress}>
        <Text
          style={styles.description}
          numberOfLines={showAllText[`${i}`] ? 0 : 4}
        >
          {value.notes}
        </Text>
      </Pressable>
    );
  };

  //Fix type any below****************************
  const timelineData = dataToMap?.map((value, i: number) => ({
    time: format(new Date(value.date), "d MMM yy"),
    // title: i,
    description: descriptionElement(value, i.toString()),

    icon:
      value.payloadTags.length > 0
        ? assignIcon(value.payloadTags[0].tagLabel)
        : assignIcon("generic"),
  }));

  return dataToMap.length > 0 ? (
    <View style={styles.container}>
      <Timeline
        data={timelineData}
        style={styles.list}
        innerCircle={"element"}
        circleSize={20}
        circleColor={"white"}
        timeStyle={styles.time}
        timeContainerStyle={styles.timeContainer}
        descriptionStyle={styles.description}
        detailContainerStyle={styles.detailContainer}
      />
    </View>
  ) : (
    <View>
      <Text>No Logs have been created yet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
  },
  list: {
    flex: 1,
    marginTop: 20,
    width: "100%",
  },
  timeContainer: {
    minWidth: 80,
  },
  time: {
    textAlign: "center",
    backgroundColor: "#ff9797",
    color: "white",
    padding: 6,
    borderRadius: 13,
  },
  detailContainer: {
    textAlign: "center",
    backgroundColor: "#BBDAFF",
    marginVertical: 10,
    maxWidth: 180,
    minHeight: 40,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
  },
  description: {
    textAlign: "center",
  },
});
