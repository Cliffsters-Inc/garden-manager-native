import { MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet } from "react-native";

import { ActionButton } from "../../components/ActionButton";
import { TagElement } from "../../components/Tags/TagElement";
import { Text, View } from "../../components/Themed";
import { Tag } from "../../features/entity.types";
import { logActions, logSelectors } from "../../features/log/log.slice";
import { photoActions } from "../../features/photos/photos.slice";
import { veggieSelectors } from "../../features/veggie/veggie.slice";
import { GardenScreenProps } from "../../navigation/navigation.types";
import { useAppDispatch, useAppSelector } from "../../store";
import { SortBtn } from "./SortBtn";
import { VeggieNotesField } from "./VeggieNotesField";

export const VeggieScreen = ({
  navigation,
  route,
}: GardenScreenProps<"VeggieScreen">) => {
  const { veggieId } = route.params;
  const [logsDescending, setLogsDescending] = useState(true);

  const dispatch = useAppDispatch();
  const veggie = useAppSelector((state) =>
    veggieSelectors.selectById(state, veggieId)
  );
  const logs = useAppSelector((state) =>
    logSelectors.selectByIds(state, veggie?.logs ?? [])
  );

  useEffect(() => {
    if (logs) {
      logs.forEach((log) => dispatch(logActions.fetchLogPhotos(log.id)));
    }
  }, []);

  const renderDisplayTag = ({ item }: { item: Tag }) => (
    <TagElement tag={item} />
  );

  return veggie ? (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        {veggie.veggieInfo?.image && (
          <Image style={styles.img} source={{ uri: veggie.veggieInfo.image }} />
        )}
      </View>
      {veggie.veggieInfo?.name && (
        <Text style={styles.title}>{veggie.veggieInfo.name}</Text>
      )}

      <VeggieNotesField
        notes={veggie.notes}
        navigation={navigation}
        route={route}
      />
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={styles.heading}>Logs</Text>
          <SortBtn
            descending={logsDescending}
            onPress={() => setLogsDescending((prev) => !prev)}
            style={{ marginRight: 20 }}
          />
          <Pressable
            onPress={() =>
              navigation.navigate("VeggieTimelineScreen", {
                veggieLogs: logs,
              })
            }
          >
            <MaterialIcons name="timeline" size={24} color="black" />
          </Pressable>
        </View>
        <FlatList
          data={logs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                dispatch(photoActions.fetchCachedPhotos());
                navigation.navigate("EditVeggieLogModal", { logId: item.id });
              }}
              style={{
                borderColor: "#d5d5d5",
                borderWidth: 2,
                borderRadius: 10,
                padding: 10,
                marginVertical: 5,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {format(new Date(item.date), "d MMM yy")}
                </Text>
                {item.payloadTags && (
                  <FlatList
                    data={item.payloadTags}
                    keyExtractor={(item) => item.tagLabel}
                    horizontal={true}
                    renderItem={renderDisplayTag}
                  />
                )}
              </View>
              <View style={{ flexDirection: "row" }}>
                {item.photos.entities &&
                  item.photos.entities.map((photoUri) => (
                    <Image
                      key={photoUri}
                      source={{ uri: photoUri, width: 50, height: 50 }}
                    />
                  ))}
              </View>
              <Text>Notes: {item.notes}</Text>
            </Pressable>
          )}
        />
      </View>
      <ActionButton
        text="Add Log"
        onPress={() => navigation.navigate("NewVeggieLogModal", { veggieId })}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginRight: "auto",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginRight: 10,
  },
});
