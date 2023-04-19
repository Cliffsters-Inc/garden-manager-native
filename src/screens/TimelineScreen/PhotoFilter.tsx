import { useEffect } from "react";

import {
  setLogsWithPics,
  switchFilterByPic,
} from "../../features/Filters/filter.slice";
import { logSelectors } from "../../features/log/log.slice";
import { useAppDispatch, useAppSelector } from "../../store";
import { SwitchSelector } from "../FilterModal/SwitchSelector";

export const PhotoFilter = () => {
  const dispatch = useAppDispatch();
  const filterByPic = useAppSelector((state) => state.filters.filterByPic);
  const globalLogs = useAppSelector(logSelectors.selectAll);

  const handlePress = () => {
    dispatch(switchFilterByPic(!filterByPic));
  };

  const filterPhotos = () => {
    const logsToFilter = [...globalLogs];
    const logsWithPics = logsToFilter
      .filter((log) => log.photos.entities.length > 0)
      .map((log) => log.id);
    console.log("logsWithPics", logsWithPics);
    dispatch(setLogsWithPics(logsWithPics));
  };

  useEffect(() => {
    if (filterByPic) {
      filterPhotos();
    } else {
      dispatch(setLogsWithPics([]));
    }
  }, [filterByPic]);

  return (
    <SwitchSelector
      name="Photo"
      handlePress={handlePress}
      tickCondition={!filterByPic}
    />
  );
};
