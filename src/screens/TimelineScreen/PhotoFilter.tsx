import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { VeggieLogNormalised } from "../../features/entity.types";
import { logSelectors } from "../../features/log/log.slice";
import { useAppSelector } from "../../store";

interface Props {
  setLogsFilteredByPics: React.Dispatch<
    React.SetStateAction<VeggieLogNormalised[]>
  >;
}

export const PhotoFilter = ({
  setLogsFilteredByPics: setlogsFilteredByPics,
}: Props) => {
  const globalLogs = useAppSelector(logSelectors.selectAll);
  const [isFilteringByPic, setIsFilteringByPic] = useState<boolean>(false);

  const filterByPhotos = () => {
    const logsToFilter = [...globalLogs];
    setlogsFilteredByPics(
      logsToFilter.filter((log) => log.photos.entities.length > 0)
    );
    setIsFilteringByPic(true);
  };

  const resetPhotoFilter = () => {
    setlogsFilteredByPics([]);
    setIsFilteringByPic(false);
  };

  const photoFilterSwitch = () => {
    return !isFilteringByPic ? filterByPhotos() : resetPhotoFilter();
  };

  return (
    <View>
      <Pressable onPress={photoFilterSwitch}>
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
