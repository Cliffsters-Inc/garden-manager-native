import { StyleSheet, Image, FlatList, Pressable } from "react-native";
import { View, Text } from "../components/Themed";
import { GardenTabScreenProps } from "../types";
import { format } from "date-fns";
import { useAppSelector } from "../store";
import { gardenSelectors } from "../services/garden/garden.selectors";
import { VeggieNotesField } from "../components/VeggieNotesField";
import { ActionButton } from "../components/shared/ActionButton";
import { useState } from "react";
import { SortBtn } from "../components/shared/SortBtn";

export const VeggieScreen = ({
  navigation,
  route,
}: GardenTabScreenProps<"VeggieScreen">) => {
  const { selectedGardenId, selectedBedId, veggieId } = route.params;
  const [logsDescending, setLogsDescending] = useState(true);
  const veggie = useAppSelector((state) =>
    gardenSelectors.selectVeggieWithSortedLogs(
      state,
      selectedGardenId,
      selectedBedId,
      veggieId,
      logsDescending
    )
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
        <View style={{ alignItems: "flex-end" }}>
          <Text>
            Sowed:{" "}
            {veggie.sowDate && format(new Date(veggie.sowDate), "dd/MM/yy")}
          </Text>
          <Text>
            Harvest:{" "}
            {veggie.harvestDate &&
              format(new Date(veggie.harvestDate), "dd/MM/yy")}
          </Text>
        </View>
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
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={styles.heading}>Logs</Text>
          <SortBtn
            descending={logsDescending}
            onPress={() => setLogsDescending((prev) => !prev)}
          />
        </View>
        <FlatList
          data={veggie.logs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("EditVeggieLogModal", {
                  selectedGardenId,
                  selectedBedId,
                  veggieId,
                  logId: item.id,
                })
              }
              style={{
                borderColor: "#d5d5d5",
                borderWidth: 2,
                borderRadius: 10,
                padding: 10,
                marginVertical: 5,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {format(new Date(item.date), "d MMM yy")}
              </Text>
              <Text>Notes: {item.notes}</Text>
            </Pressable>
          )}
        />
      </View>
      <ActionButton
        text="Add Log"
        onPress={() =>
          navigation.navigate("NewVeggieLogModal", {
            selectedGardenId,
            selectedBedId,
            veggieId,
          })
        }
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
