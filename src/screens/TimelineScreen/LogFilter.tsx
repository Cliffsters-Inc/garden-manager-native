import { Text, View } from "../../components/Themed";

interface Props {
  filteredLogs: string[];
}

export const LogFilter = ({ filteredLogs }: Props) => {
  console.log("flogs", filteredLogs);
  return (
    <View>
      <Text>Timeline Filter comp</Text>
    </View>
  );
};
