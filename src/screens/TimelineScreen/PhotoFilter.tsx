import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { VeggieLogNormalised } from "../../features/entity.types";
import {
  setLogsWithPics,
  switchFilterByPic,
} from "../../features/filters/filterSlice";
import { logSelectors } from "../../features/log/log.slice";
import { useAppDispatch, useAppSelector } from "../../store";

export const PhotoFilter = () => {
  const dispatch = useAppDispatch();
  const filterByPic = useAppSelector((state) => state.filters.filterByPic);
  const globalLogs = useAppSelector(logSelectors.selectAll);

  const handlePress = () => {
    dispatch(switchFilterByPic(!filterByPic));
  };

  const filterByPhotos = () => {
    const logsToFilter = [...globalLogs];
    const logsWithPics = logsToFilter
      .filter((log) => log.photos.entities.length > 0)
      .map((log) => log.id);
    console.log("logsWithPics", logsWithPics);
    dispatch(setLogsWithPics(logsWithPics));
  };

  const resetPhotoFilter = () => {
    dispatch(setLogsWithPics([]));
  };

  useEffect(() => {
    if (filterByPic) {
      filterByPhotos();
      console.log("filter on");
    } else {
      resetPhotoFilter();
      console.log("filter off");
    }
  }, [filterByPic]);

  return (
    <View>
      {/* <Pressable onPress={() => dispatch(switchFilterByPic(!filterByPic))}> */}
      <Pressable onPress={handlePress}>
        <Text style={styles.categorySelector}>Photo</Text>
      </Pressable>
      <View style={{ marginLeft: 200, justifyContent: "flex-end" }}>
        {filterByPic && <FontAwesome5 name="check" size={24} color="green" />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categorySelector: {
    fontSize: 20,
    marginTop: 30,
  },
});
