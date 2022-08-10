/* eslint-disable import/namespace */
import { Pressable } from "react-native";

import { Text, View } from "../../components/Themed";
import { VeggieLogNormalised } from "../../features/entity.types";
import { logSelectors } from "../../features/log/log.slice";
import { useAppSelector } from "../../store";

interface Props {
  filterLogs: (arr: VeggieLogNormalised[]) => void;
}

export const PhotoFilter = ({ filterLogs }: Props) => {
  const globalLogs = useAppSelector(logSelectors.selectAll);

  const FilterByPhotos = () => {
    const logsToFilter = [...globalLogs];
    const filteredList = logsToFilter.filter(
      (log) => log.photos.entities.length > 0
    );
    filterLogs(filteredList);
  };

  return (
    <Pressable onPress={FilterByPhotos}>
      <Text>Photo</Text>
    </Pressable>
  );
};
