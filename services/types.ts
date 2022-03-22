// export type Plant = {
//   name: string;
//   id: string;
//   plantationDate: string; // use ISO date eg.	"2022-03-16T07:59:10.647Z"
//   harvestDate?: string;
//   notes?: string;
// };

// export type Garden = {
//   beds: { name: string; id: string; plants?: Plant[] }[];
// };

export type Plant = {
  name: string;
  sowDate: string;
  harvestDate: string;
  notes: string;
};

export type Bed = {
  name: string;
  id: string;
  plants: Plant[];
};

export type Garden = {
  gardens: { name: string; id: string; beds: Bed[] }[];
};
