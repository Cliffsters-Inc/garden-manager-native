import { GardenScreenProps } from "../../navigation/navigation.types";
import { TimelineElement } from "./TimelineElement";

export const VeggieTimelineScreen = ({
  route,
}: GardenScreenProps<"VeggieTimelineScreen">) => {
  const { veggieLogs } = route.params;

  return <TimelineElement dataToMap={veggieLogs} />;
};
