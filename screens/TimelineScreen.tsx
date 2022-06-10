import { Text, View } from "../components/Themed";
import { gardenSelectors } from "../services/garden/garden.selectors";
import { useAppSelector } from "../store";

export const TimelineScreen = () => {
  const logs = useAppSelector((state) =>
    gardenSelectors.selectGlobalLogs(state)
  );

  console.log("logs", logs);

  return (
    <View>
      <Text>Timeline</Text>
    </View>
  );
};
