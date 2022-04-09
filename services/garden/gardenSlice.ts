import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { initialGardenState } from "./initialGardenState";
import { RootState } from "../../store";
import { VeggieInfo } from "../types";

export const gardenSlice = createSlice({
  name: "gardens",
  initialState: initialGardenState,
  reducers: {
    addGarden: (gardens, action: PayloadAction<{ name: string }>) => {
      const { payload } = action;

      gardens.push({
        name: payload.name,
        id: nanoid(),
        beds: [{ name: "1", id: nanoid(), veggies: [] }],
      });
    },
    removeGarden: (gardens, action: PayloadAction<{ id: string }>) => {
      const { payload } = action;

      const updatedBeds = gardens.filter((bed) => bed.id !== payload.id);
      gardens = updatedBeds;
    },
    addBed: (gardens, action: PayloadAction<{ name: string; id: string }>) => {
      const { payload } = action;

      let gardenIndex = gardens.findIndex((garden) => garden.id === payload.id);
      gardens[gardenIndex].beds?.push({
        name: payload.name,
        id: nanoid(),
        veggies: [],
      });
    },
    addVeggie: (
      gardens,
      action: PayloadAction<{
        gardenId: string;
        bedId: string;
        veggieInfo: VeggieInfo;
      }>
    ) => {
      const { gardenId, bedId, veggieInfo } = action.payload;

      const garden = gardens.find((garden) => garden.id === gardenId);
      const bed = garden?.beds?.find((bed) => bed.id === bedId);

      if (bed && veggieInfo) {
        bed?.veggies?.push({
          id: nanoid(),
          name: veggieInfo.name,
          veggieInfoId: veggieInfo.id,
        });
      }
    },
  },
});

export const gardenActions = gardenSlice.actions;

export type GardenSlice = {
  [gardenSlice.name]: ReturnType<typeof gardenSlice["reducer"]>;
};

export const gardenSelectors = {
  selectGardens: (state: RootState) => state.gardens,
  selectBed: (state: RootState, gardenId: string, bedId: string) =>
    state.gardens
      .find((garden) => garden.id === gardenId)
      ?.beds?.find((bed) => bed.id === bedId),
};
