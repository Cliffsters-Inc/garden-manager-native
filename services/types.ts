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

type NormalizedObjects<T> = {
  byId: { [id: string]: T };
  allIds: string[];
};

export type GardenNormalisedState = {
  gardens?: NormalizedObjects<GardenNormalised>;
  beds?: NormalizedObjects<BedNormalised>;
  veggies?: NormalizedObjects<VeggieNormalised>;
  veggieLogs?: NormalizedObjects<VeggieLogNormalised>;
};

export type Garden = {
  name: string | undefined;
  id: string;
  beds?: Bed[];
};

export type GardenNormalised = {
  name: string | undefined;
  id: string;
  beds?: string[];
};

export type NewCardForm = {
  newCardName: string;
};

export type RenameCardForm = {
  newCardName: string | undefined;
  id?: string | undefined;
};

export type Bed = {
  name: string | undefined;
  id: string;
  veggies?: Veggie[];
};

export type BedNormalised = {
  name: string | undefined;
  id: string;
  veggies?: string[];
  garden: string;
};

export type Veggie = {
  id: string;
  veggieInfo: { id: string; name?: string; image?: string }; // name & image should be generated with id from veggieInfo to allow changes to veggieInfo apply to all veggies
  notes?: string;
  sowDate?: string;
  harvestDate?: string;
  logs: VeggieLog[];
};

export type VeggieNormalised = {
  id: string;
  veggieInfo: { id: string; name?: string; image?: string }; // name & image should be generated with id from veggieInfo to allow changes to veggieInfo apply to all veggies
  notes?: string;
  sowDate?: string;
  harvestDate?: string;
  logs: string[];
  bed: string;
};

export type VeggieLog = {
  id: string;
  date: number;
  notes?: string;
  photos?: string[];
  soilDescription?: string;
  phLevel?: number;
};

export type VeggieLogNormalised = {
  id: string;
  date: number;
  notes?: string;
  photos?: string[];
  soilDescription?: string;
  phLevel?: number;
  veggie: string;
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
