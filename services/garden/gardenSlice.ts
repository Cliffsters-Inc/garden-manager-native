import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { Garden } from "../types";
import { initialState } from "../initialState";
import { RootState } from "../../store";

export const gardenSlice = createSlice({
  name: "garden",
  initialState: initialState as Garden,
  reducers: {
    addGarden: (state, action: PayloadAction<{ name: string }>) => {
      const { payload } = action;

      state.gardens.push({ name: payload.name, id: nanoid(), beds: [] });
    },
    removeGarden: (state, action: PayloadAction<{ id: string }>) => {
      const { payload } = action;

      const updatedBeds = state.gardens.filter((bed) => bed.id !== payload.id);
      state.gardens = updatedBeds;
    },
  },
});

export const gardenActions = gardenSlice.actions;

export type GardenSlice = {
  [gardenSlice.name]: ReturnType<typeof gardenSlice["reducer"]>;
};

export const gardenSelectors = {
  selectGarden: (state: RootState) => state,
  selectBeds: (state: RootState) => state.garden,
  // selectBed: (state: RootState, bedId: string) =>
  //   state.garden.beds.find((bed) => bed.id === bedId),
};
