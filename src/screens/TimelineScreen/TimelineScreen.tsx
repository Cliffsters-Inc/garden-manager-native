import { logSelectors } from "../../features/log/log.slice";
import { TimelineScreenProps } from "../../navigation/navigation.types";
import { useAppSelector } from "../../store";
import { TimelineElement } from "./TimelineElement";

export const TimelineScreen = ({
  navigation,
}: TimelineScreenProps<"TimelineScreen">) => {
  const globalLogs = useAppSelector(logSelectors.selectAll);

  return <TimelineElement dataToMap={globalLogs} />;
};
