/* eslint-disable import/namespace */
import { Pressable, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { VeggieLogNormalised } from "../../features/entity.types";
import { logSelectors } from "../../features/log/log.slice";
import { useAppSelector } from "../../store";

interface Props {
  setIsTimelineFiltered: React.Dispatch<React.SetStateAction<boolean>>;
  setlogsFilteredByPics: React.Dispatch<
    React.SetStateAction<VeggieLogNormalised[]>
  >;
}

export const PhotoFilter = ({
  setIsTimelineFiltered,
  setlogsFilteredByPics,
}: Props) => {
  const globalLogs = useAppSelector(logSelectors.selectAll);

  const FilterByPhotos = () => {
    const logsToFilter = [...globalLogs];
    const filteredList = logsToFilter.filter(
      (log) => log.photos.entities.length > 0
    );
    setlogsFilteredByPics(filteredList);
    setIsTimelineFiltered(true);
    logsToFilter.forEach((log) => {
      if (log.photos.entities.length > 0) {
        console.log("yes", log);
      } else {
        console.log("no");
      }
    });
    console.log("Pictest");
    console.log("filteredList", filteredList);
  };

  return (
    <View>
      <Pressable onPress={FilterByPhotos}>
        <Text style={styles.categorySelector}>Photo</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  categorySelector: {
    fontSize: 20,
    marginTop: 30,
  },
});
