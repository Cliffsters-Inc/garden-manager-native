/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { CalendarTabScreen } from "../screens/CalendarTabScreen";
import { GardenTabScreen } from "../screens/GardenTabScreen";
import ModalScreen from "../screens/ModalScreen";
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
  VeggiesTabParamList,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

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
  return (
    <Stack.Navigator>
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
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
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
