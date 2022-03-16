export type Plant = {
  name: string;
  id: string;
  plantationDate: string; // use ISO date eg.	"2022-03-16T07:59:10.647Z"
  harvestDate?: string;
  notes?: string;
};

export type Garden = {
  beds: { name: string; id: string; plants?: Plant[] }[];
};
