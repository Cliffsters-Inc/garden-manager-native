import { StyleSheet } from "react-native";
import { TimelineTabScreenProps } from "../types";
import { useAppSelector } from "../store";
import { gardenSelectors } from "../services/garden/garden.selectors";
import { TimelineElement } from "../components/shared/TimelineElement";

export const TimelineTabScreen = ({
  navigation,
}: TimelineTabScreenProps<"TimelineTabScreen">) => {
  const globalLogs = useAppSelector((state) =>
    gardenSelectors.selectGlobalLogs(state)
  );

  return <TimelineElement dataToMap={globalLogs} />;
};
