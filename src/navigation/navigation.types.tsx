/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { VeggieInfo, VeggieLogNormalised } from "../features/entity.types";
import { LocationObj } from "../screens/BedScreen/BedCards";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

/**
 * Root Stack
 */
export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  AddVeggieModal: { selectedBedId: string };
  NotFound: undefined;
  NewVeggieLogModal: { veggieId: string; locationTitles: any };
  EditVeggieLogModal: { logId: string };
  CreateCardModal: { selectedGardenId?: string } | undefined;
  CardOptionsModal:
    | { selectedGardenId?: never; selectedBedId: string }
    | { selectedGardenId: string; selectedBedId?: never };
  RenameCardModal:
    | { selectedGardenId?: never; selectedBedId: string }
    | { selectedGardenId: string; selectedBedId?: never };
  DeleteConfirmationModal:
    | { selectedGardenId?: never; selectedBedId: string }
    | { selectedGardenId: string; selectedBedId?: never };
  CameraModal: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

/**
 * Root Tab
 */
export type RootTabParamList = {
  GardenTab: NavigatorScreenParams<GardenTabParamList>;
  VeggiesTab: NavigatorScreenParams<VeggiesTabParamList>;
  TimelineTab: NavigatorScreenParams<TimelineTabParamList>;
  CalendarTab: NavigatorScreenParams<CalendarTabParamList>;
  SettingsTab: NavigatorScreenParams<SettingsTabParamList>;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

/**
 * Garden Tab
 */
export type GardenTabParamList = {
  GardenScreen: undefined;
  GardenCards: undefined;
  BedsScreen: {
    selectedGardenId: string;
  };
  BedScreen: { selectedBedId: string; locationTitles: LocationObj };
  VeggieScreen: { veggieId: string; locationTitles: LocationObj };
  VeggieTimelineScreen: { veggieLogs: VeggieLogNormalised[] }; // TODO: fix type
};

export type GardenScreenProps<Screen extends keyof GardenTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<GardenTabParamList, Screen>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

/**
 * Veggies Tab
 */
export type VeggiesTabParamList = {
  VeggiesScreen: undefined;
  VeggieInfoScreen: { title: string; veggieInfo: VeggieInfo };
};

export type VeggiesScreenProps<Screen extends keyof VeggiesTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<VeggiesTabParamList, Screen>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

/**
 * Timeline Tab
 */

export type TimelineTabParamList = {
  TimelineScreen: { screen: undefined };
};

export type TimelineScreenProps<Screen extends keyof TimelineTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TimelineTabParamList, Screen>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

/**
 * Calendar Tab
 */
export type CalendarTabParamList = {
  CalendarScreen: undefined;
};

export type CalendarScreenProps<Screen extends keyof CalendarTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<CalendarTabParamList, Screen>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

/**
 * Settings Tab
 */
export type SettingsTabParamList = {
  SettingsScreen: undefined;
};

export type SettingsScreenProps<Screen extends keyof SettingsTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<SettingsTabParamList, Screen>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
