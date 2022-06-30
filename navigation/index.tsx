/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Button, ColorSchemeName } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { CalendarTabScreen } from "../screens/CalendarTabScreen";
import { GardenTabScreen } from "../screens/GardenTabScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { VeggieInfoScreen } from "../screens/VeggieInfoScreen";
import { VeggiesTabScreen } from "../screens/VeggiesTabScreen";
import { SettingsTabScreen } from "../screens/SettingsTabScreen";
import {
  CalendarTabParamList,
  GardenTabParamList,
  RootStackParamList,
  RootTabParamList,
  SettingsTabParamList,
  TimelineTabParamList,
  VeggiesTabParamList,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { BedsTabScreen } from "../screens/BedsTabScreen";
import { BedScreen } from "../screens/BedScreen";
import { VeggieScreen } from "../screens/VeggieScreen";
import { AddVeggieModalScreen } from "../screens/AddVeggieModalScreen";
import { NewVeggieLogModalScreen } from "../screens/NewVeggieLogModalScreen";
import { CardOptionsModal } from "../screens/CardOptionsModal";
import { DeleteConfirmationModalScreen } from "../screens/DeleteConfirmationModalScreen";
import { CreateCardModalScreen } from "../screens/CreateCardModalScreen.tsx";
import { RenameCardModalScreen } from "../screens/RenameCardModalScreen";
import { EditVeggieLogModal } from "../screens/EditVeggieLogModal";
import { pressedTagsContext } from "../services/context";
import { TagProps } from "../services/types";
import { TimelineTabScreen } from "../screens/TimelineTabScreen";
import { VeggieTimelineScreen } from "../screens/VeggieTimelineScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [pressedTags, setPressedTags] = React.useState<TagProps[]>([]);
  const tagsValue = React.useMemo(
    () => ({
      pressedTags: pressedTags,
      setPressedTags: setPressedTags,
    }),
    [pressedTags, setPressedTags]
  );
  return (
    <pressedTagsContext.Provider value={tagsValue}>
      <Stack.Navigator>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: "Oops!" }}
          />
          <Stack.Screen
            name="EditVeggieLogModal"
            component={EditVeggieLogModal}
            options={({ navigation }) => ({
              headerLeft: () => (
                <Button title="Cancel" onPress={navigation.goBack} />
              ),
              title: "Log",
            })}
          />
          <Stack.Screen
            name="CreateCardModal"
            component={CreateCardModalScreen}
            options={({ navigation }) => ({
              headerLeft: () => (
                <Button title="Cancel" onPress={navigation.goBack} />
              ),
            })}
          />
          <Stack.Screen
            name="RenameCardModal"
            component={RenameCardModalScreen}
            options={({ navigation }) => ({
              headerLeft: () => (
                <Button title="Cancel" onPress={navigation.goBack} />
              ),
            })}
          />
          <Stack.Screen
            name="CardOptionsModal"
            component={CardOptionsModal}
            options={{
              headerShown: false,
              presentation: "transparentModal",
            }}
          />
          <Stack.Screen
            name="DeleteConfirmationModal"
            component={DeleteConfirmationModalScreen}
            options={{
              headerShown: false,
              presentation: "transparentModal",
            }}
          />
          <Stack.Screen
            name="AddVeggieModal"
            component={AddVeggieModalScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <Button title="Cancel" onPress={navigation.goBack} />
              ),
              title: "Add a Veggie",
            })}
          />
          <Stack.Screen
            name="NewVeggieLogModal"
            component={NewVeggieLogModalScreen}
            options={({ navigation }) => ({
              headerLeft: () => (
                <Button title="Cancel" onPress={navigation.goBack} />
              ),
              title: "New Log",
            })}
          />
        </Stack.Group>
      </Stack.Navigator>
    </pressedTagsContext.Provider>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="GardenTab"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="GardenTab"
        component={GardenTabNavigator}
        options={() => ({
          title: "Garden",
          tabBarIcon: ({ color }) => <TabBarIcon name="tree" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="VeggiesTab"
        component={VeggiesTabNavigator}
        options={() => ({
          title: "Veggies",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="seedling" color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="TimelineTab"
        component={TimelineTabNavigator}
        options={() => ({
          title: "Timeline",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="timeline-clock-outline"
              size={29}
              color={color}
              style={{ marginBottom: -3 }}
            />
          ),
        })}
      />
      <BottomTab.Screen
        name="CalendarTab"
        component={CalendarTabNavigator}
        options={() => ({
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="SettingsTab"
        component={SettingsTabNavigator}
        options={() => ({
          title: "Settings",
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        })}
      />
    </BottomTab.Navigator>
  );
}

const GardenStack = createNativeStackNavigator<GardenTabParamList>();

function GardenTabNavigator() {
  return (
    <GardenStack.Navigator>
      <GardenStack.Screen
        name="GardenTabScreen"
        component={GardenTabScreen}
        options={{ title: "Garden" }}
      />
      <GardenStack.Screen
        name="BedsTabScreen"
        component={BedsTabScreen}
        options={{ title: "Beds" }}
      />
      <GardenStack.Screen
        name="BedScreen"
        component={BedScreen}
        options={{ title: "Bed" }}
      />
      <GardenStack.Screen
        name="VeggieScreen"
        component={VeggieScreen}
        options={{ title: "Veggie" }}
      />
      <GardenStack.Screen
        name="VeggieTimelineScreen"
        component={VeggieTimelineScreen}
        options={{ title: "Timeline" }}
      />
    </GardenStack.Navigator>
  );
}

const VeggiesStack = createNativeStackNavigator<VeggiesTabParamList>();

function VeggiesTabNavigator() {
  return (
    <VeggiesStack.Navigator>
      <VeggiesStack.Screen
        name="VeggiesTabScreen"
        component={VeggiesTabScreen}
        options={{ title: "Veggies" }}
      />
      <VeggiesStack.Screen
        name="VeggieInfoScreen"
        component={VeggieInfoScreen}
        options={({ route }) => ({
          title: route.params.veggieInfo.name,
          headerBackTitle: "Veggies",
        })}
      />
    </VeggiesStack.Navigator>
  );
}

const TimelineStack = createNativeStackNavigator<TimelineTabParamList>();

function TimelineTabNavigator() {
  return (
    <TimelineStack.Navigator>
      <TimelineStack.Screen
        name="TimelineTabScreen"
        component={TimelineTabScreen}
        options={{ title: "Timeline" }}
      />
    </TimelineStack.Navigator>
  );
}

const CalendarStack = createNativeStackNavigator<CalendarTabParamList>();

function CalendarTabNavigator() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="CalendarTabScreen"
        component={CalendarTabScreen}
        options={{ title: "Calendar" }}
      />
    </CalendarStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator<SettingsTabParamList>();

function SettingsTabNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsTabScreen"
        component={SettingsTabScreen}
        options={{ title: "Settings" }}
      />
    </SettingsStack.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
}) {
  return <FontAwesome5 size={25} style={{ marginBottom: -3 }} {...props} />;
}
