export type Plant = {
  name: string;
  id: string;
  plantationDate: number; // use epochDate eg. 1647339947
  harvestDate?: number; // use epochDate eg. 1647339947
  notes?: string;
};

export type Garden = {
  beds: { name: string; id: string; plants?: Plant[] }[];
};
