// export type Plant = {
//   name: string;
//   id: string;
//   plantationDate: string; // use ISO date eg.	"2022-03-16T07:59:10.647Z"
//   harvestDate?: string;
//   notes?: string;
// };

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
  plantInfoId: string;
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

export type PlantInfo = {
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
  plants: PlantInfo[];
};
