import { TimelineTabScreenProps } from "../types";
import { useAppSelector } from "../store";
import { logSelectors } from "../services/log/log.slice";
import { TimelineElement } from "../components/shared/TimelineElement";

export const TimelineTabScreen = ({
  navigation,
}: TimelineTabScreenProps<"TimelineTabScreen">) => {
  const globalLogs = useAppSelector(logSelectors.selectAll);

  return <TimelineElement dataToMap={globalLogs} />;
};
