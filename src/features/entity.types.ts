import { ReactElement } from "react";

import { Icon } from "../components/Tags/TagIcon";

type Months =
  | "JAN"
  | "FEB"
  | "MAR"
  | "APR"
  | "MAY"
  | "JUN"
  | "JUL"
  | "AUG"
  | "SEP"
  | "OCT"
  | "NOV"
  | "DEC";

export type LoadingStates = "idle" | "pending" | "succeeded" | "failed";

export type Garden = {
  name: string;
  id: string;
  beds: Bed[];
};

export type GardenNormalised = {
  name: string;
  id: string;
  beds: string[];
};

export type NewCardForm = {
  newCardName: string;
};

export type RenameCardForm = {
  newCardName: string;
  id: string;
};

export type Bed = {
  name: string;
  id: string;
  veggies: Veggie[];
};

export type BedNormalised = {
  name: string;
  id: string;
  veggies: string[];
  garden: string;
};

export type Veggie = {
  id: string;
  veggieInfo: { id: string; name?: string; image?: string }; // name & image should be generated with id from veggieInfo to allow changes to veggieInfo apply to all veggies
  notes?: string;
  logs: VeggieLog[];
};

export type VeggieNormalised = {
  id: string;
  veggieInfo: { id: string; name?: string; image?: string }; // name & image should be generated with id from veggieInfo to allow changes to veggieInfo apply to all veggies
  notes?: string;
  logs: string[];
  bed: string;
};

export type VeggieLog = {
  id: string;
  date: number;
  notes?: string;
  photos?: string[];
  payloadTags: Tag[];
};

export type VeggieLogNormalised = {
  id: string;
  date: number;
  notes?: string;
  photos: {
    entities: string[];
    loading: LoadingStates;
  };
  veggie: string;
  payloadTags: Tag[];
};

export type Tag = {
  tagLabel: string;
  tagColor: string;
  tagIcon?: string;
};

export type VeggieInfo = {
  id: string;
  name: string;
  description?: string; // TODO: won't be optional once all veggies added with descriptions
  growSeason: { from: Months; to: Months };
  germinationPeriod: {
    from: number;
    to: number;
    timeFrameType: "days" | "weeks";
  };
  sproutToHarvestPeriod: {
    from: number;
    to: number;
    timeFrameType: "days" | "weeks" | "years";
  };
  companionVeggieIds?: string[];
  combativeVeggieIds?: string[];
  image?: string;
  starred: boolean;
};
