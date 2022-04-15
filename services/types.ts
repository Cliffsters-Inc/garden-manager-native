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

export type Garden = {
  name: string;
  id: string;
  beds?: Bed[];
};

export type NewCardForm = {
  newCardName: string;
};

export type NewBedForm = {
  newBedName: string;
};

export type Bed = {
  name: string;
  id: string;
  veggies?: Veggie[];
};

export type Veggie = {
  id: string;
  veggieInfo: { id: string; name?: string; image?: string }; // name & image should be generated with id from veggieInfo to allow changes to veggieInfo apply to all veggies
  notes?: string;
  sowDate?: string;
  harvestDate?: string;
  logs?: VeggieLog[];
};

export type VeggieLog = {
  id: string;
  creationDate: string;
  editedDate?: string;
  soilDescription?: string;
  phLevel?: number;
  notes?: string;
  photos?: string[];
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
