import { useEffect, useState } from "react";
import { FlatList, Pressable } from "react-native";
import { Button } from "react-native-elements";

import { convertToTag, DefaultTagsList } from "../../components/Tags/Tag.utils";
import { TagElement } from "../../components/Tags/TagElement";
import { View } from "../../components/Themed";
import { Tag, VeggieLogNormalised } from "../../features/entity.types";
import { logSelectors } from "../../features/log/log.slice";
import { TimelineScreenProps } from "../../navigation/navigation.types";
import { useAppSelector } from "../../store";
import { LogFilter } from "./LogFilter";
import { Test } from "./Test";
import { TimelineElement } from "./TimelineElement";

export const TimelineScreen = ({
  navigation,
}: TimelineScreenProps<"TimelineScreen">) => {
  const globalLogs = useAppSelector(logSelectors.selectAll);
  const [combinedTagsList, setCombinedTagsList] = useState<Tag[]>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [filteredLogs, setFilteredLogs] = useState<VeggieLogNormalised[]>([]);
  const [filterArray, setFilterArray] = useState<string[]>([]);

  useEffect(() => {
    const combinedTags: Tag[] = DefaultTagsList.map((tag) => convertToTag(tag));
    setCombinedTagsList(combinedTags);
  }, []);

  const renderTags = ({ item }: { item: Tag }) => {
    return (
      <Pressable
        onPress={() => setFilterArray([...filterArray, item.tagLabel])}
      >
        <TagElement tag={item} />
      </Pressable>
    );
  };

  const filter = () => {
    const logsToFilter = globalLogs;
    const filteredList = logsToFilter.filter((log) =>
      log.payloadTags.some((tag) => {
        return filterArray.includes(tag.tagLabel);
      })
    );
    setIsFiltered(true);
    setFilteredLogs(filteredList);
  };

  const con = () => {
    console.log("filteredArray", filterArray);
    console.log("filteredLogs", filteredLogs);
    console.log("isFiltered", isFiltered);
    console.log("glogs", globalLogs);
  };

  return (
    <View>
      <FlatList
        data={combinedTagsList}
        keyExtractor={(item) => item.tagLabel}
        horizontal
        renderItem={renderTags}
      />
      <Button title="filter" onPress={filter} />
      <Button title="con" onPress={con} />

      {/* <Test /> */}

      {/* <TimelineElement dataToMap={globalLogs} /> */}

      {isFiltered ? (
        <TimelineElement dataToMap={filteredLogs} />
      ) : (
        <TimelineElement dataToMap={globalLogs} />
      )}
    </View>
  );
};
