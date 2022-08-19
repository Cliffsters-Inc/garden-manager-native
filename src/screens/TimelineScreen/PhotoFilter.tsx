/* eslint-disable import/namespace */
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { VeggieLogNormalised } from "../../features/entity.types";
import { logSelectors } from "../../features/log/log.slice";
import { useAppSelector } from "../../store";

interface Props {
  isTimelineFiltered: boolean;
  setIsTimelineFiltered: React.Dispatch<React.SetStateAction<boolean>>;
  logsFilteredByPics: VeggieLogNormalised[];
  setLogsFilteredByPics: React.Dispatch<
    React.SetStateAction<VeggieLogNormalised[]>
  >;
}

export const PhotoFilter = ({
  logsFilteredByPics,
  setIsTimelineFiltered,
  setLogsFilteredByPics: setlogsFilteredByPics,
}: Props) => {
  const globalLogs = useAppSelector(logSelectors.selectAll);
  const [isFilteringByPic, setIsFilteringByPic] = useState<boolean>(false);

  const filterByPhotos = () => {
    const logsToFilter = [...globalLogs];
    const filteredList = logsToFilter.filter(
      (log) => log.photos.entities.length > 0
    );
    setlogsFilteredByPics(filteredList);
    setIsTimelineFiltered(true);
    setIsFilteringByPic(true);

    console.log("PicFilterPressed");
  };

  const resetPhotoFilter = () => {
    setlogsFilteredByPics([]);
    setIsFilteringByPic(false);
  };

  const photoFilterSwitch = () => {
    return !isFilteringByPic ? filterByPhotos() : resetPhotoFilter();
  };

  //should this be moved back to filterModal????? Would have to move icon too probably.
  // yes it will to prevent Asana problem. Alternatively the isFilteringByPic state could be lifted to top.
  useEffect(() => {
    if (logsFilteredByPics.length === 0) {
      setIsFilteringByPic(false);
    }
  }, [logsFilteredByPics]);

  return (
    <View>
      <Pressable onPress={photoFilterSwitch}>
        <Text style={styles.categorySelector}>Photo</Text>
      </Pressable>
      <View style={{ marginLeft: 200, justifyContent: "flex-end" }}>
        {isFilteringByPic && (
          <FontAwesome5 name="check" size={24} color="green" />
        )}
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
