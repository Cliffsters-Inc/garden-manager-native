import { filterByPhoto } from "../../features/Filters/filter.slice";
import { logSelectors } from "../../features/log/log.slice";
import { useAppDispatch, useAppSelector } from "../../store";
import { SwitchSelector } from "../FilterModal/SwitchSelector";

export const PhotoFilter = () => {
  const dispatch = useAppDispatch();
  const filteringByPic = useAppSelector(
    (state) => state.filters.filteringByPic
  );
  const globalLogs = useAppSelector(logSelectors.selectAll);

  const filter = () => {
    const logsToFilter = [...globalLogs];
    dispatch(filterByPhoto(logsToFilter));
  };

  return (
    <SwitchSelector
      name="Photo"
      handlePress={filter}
      tickCondition={!filteringByPic}
    />
  );
};
