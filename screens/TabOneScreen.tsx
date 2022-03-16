import { FlatList, StyleSheet } from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useAppSelector, useAppDispatch } from "../store";
export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const garden = useAppSelector((state) => state.garden);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Garden Beds</Text>
      <FlatList
        data={garden.beds}
        renderItem={({ item }) => (
          <View key={item.id}>
            <Text style={styles.subTitle}>{item.name}</Text>
            {item.plants && (
              <FlatList
                data={item.plants}
                renderItem={({ item }) => (
                  <View style={styles.plantContainer} key={item.id}>
                    <Text style={{ color: "green" }}>{item.name}</Text>
                    {item.notes && <Text>Notes: {item.notes}</Text>}

                    <View
                      style={styles.separator}
                      lightColor="#eee"
                      darkColor="rgba(255,255,255,0.1)"
                    />
                  </View>
                )}
              />
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  plantContainer: {
    paddingLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: "80%",
  },
});
