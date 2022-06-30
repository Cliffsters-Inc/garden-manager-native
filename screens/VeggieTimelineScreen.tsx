import { TimelineElement } from "../components/shared/TimelineElement";
import { GardenTabScreenProps } from "../types";

export const VeggieTimelineScreen = ({
  route,
}: GardenTabScreenProps<"VeggieTimelineScreen">) => {
  const { veggieLogs } = route.params;

  return <TimelineElement dataToMap={veggieLogs} />;
};
