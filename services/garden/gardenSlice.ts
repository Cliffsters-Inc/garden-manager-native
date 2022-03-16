import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { Garden } from "../types";
import { initialState } from "../initialState";
import { RootState } from "../../store";

export const gardenSlice = createSlice({
  name: "garden",
  initialState: initialState.garden as Garden,
  reducers: {
    addBed: (state, action: PayloadAction<{ name: string }>) => {
      const { payload } = action;

      state.beds.push({ name: payload.name, id: nanoid() });
    },
    removeBed: (state, action: PayloadAction<{ id: string }>) => {
      const { payload } = action;

      const updatedBeds = state.beds.filter((bed) => bed.id !== payload.id);
      state.beds = updatedBeds;
    },
  },
});

export const gardenActions = gardenSlice.actions;

export type GardenSlice = {
  [gardenSlice.name]: ReturnType<typeof gardenSlice["reducer"]>;
};

export const gardenSelectors = {
  selectGarden: (state: RootState) => state.garden,
  selectBeds: (state: RootState) => state.garden.beds,
  selectBed: (state: RootState, bedId: string) =>
    state.garden.beds.find((bed) => bed.id === bedId),
};
