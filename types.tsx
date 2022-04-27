/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { Bed, Veggie } from "./services/types";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VeggieInfo } from "./services/types";

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
  AddVeggieModal: { selectedGardenId: string; selectedBedId: string };
  NotFound: undefined;
  NewVeggieLogModal: {
    selectedGardenId: string;
    selectedBedId: string;
    veggieId: string;
  };
  CardOptionsModal: { selectedGardenId: string; selectedBedId?: string };
  DeleteConfirmationModal: { selectedGardenId: string; selectedBedId?: string };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

/**
 * Root Tab
 */
export type RootTabParamList = {
  GardenTab: NavigatorScreenParams<GardenTabParamList>;
  VeggiesTab: NavigatorScreenParams<VeggiesTabParamList>;
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
  GardenTabScreen: undefined;
  GardenCards: undefined;
  CustomCard: { selectedGardenId: string; title: string };
  CardOptionsModalScreen: { gardenId: string; bedId?: string };
  BedsTabScreen: { selectedGardenId: string; selectedBedId?: string };
  BedScreen: { selectedGardenId: string; selectedBedId: string };
  VeggieScreen: {
    selectedGardenId: string;
    selectedBedId: string;
    veggieId: string;
  };
};

export type GardenTabScreenProps<Screen extends keyof GardenTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<GardenTabParamList, Screen>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

/**
 * Veggies Tab
 */
export type VeggiesTabParamList = {
  VeggiesTabScreen: undefined;
  VeggieInfoScreen: { title: string; veggieInfo: VeggieInfo };
};

export type VeggiesTabScreenProps<Screen extends keyof VeggiesTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<VeggiesTabParamList, Screen>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

/**
 * Calendar Tab
 */
export type CalendarTabParamList = {
  CalendarTabScreen: undefined;
};

export type CalendarTabScreenProps<Screen extends keyof CalendarTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<CalendarTabParamList, Screen>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

/**
 * Settings Tab
 */
export type SettingsTabParamList = {
  SettingsTabScreen: undefined;
};

export type SettingsTabScreenProps<Screen extends keyof SettingsTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<SettingsTabParamList, Screen>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
