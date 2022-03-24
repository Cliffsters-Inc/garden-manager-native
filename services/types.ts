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
  beds: { name: string; id: string; plants?: Plant[] }[];
};

export type Bed = {
  name: string;
  id: string;
  plants: Plant[];
};

export type Plant = {
  id: string;
  veggieInfoId: string;
  name: string;
  sowDate: string;
  harvestDate: string;
  logs: PlantLog[];
};

export type PlantLog = {
  id: string;
  creationDate: string;
  editedDate: string;
  soilDescription: string;
  phLevel: number;
  notes: string;
  photos: string[];
};

export type VeggieInfo = {
  id: string;
  name: string;
  description: string;
  growSeason: { from: Months; to: Months };
  companionPlantIds?: string[];
  combativePlantIds?: string[];
  image?: string;
  starred: boolean;
};

export type MockData = {
  veggies: VeggieInfo[];
};
