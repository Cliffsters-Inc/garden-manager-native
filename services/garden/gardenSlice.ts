import React from "react";
import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { Garden } from "../types";
import { initialGardenState } from "./initialGardenState";
import { RootState } from "../../store";

export const gardenSlice = createSlice({
  name: "gardens",
  initialState: initialGardenState as Garden[],
  reducers: {
    addGarden: (gardens, action: PayloadAction<{ name: string }>) => {
      const { payload } = action;

      gardens.push({ name: payload.name, id: nanoid(), beds: [] });
    },
    removeGarden: (gardens, action: PayloadAction<{ id: string }>) => {
      const { payload } = action;

      const updatedBeds = gardens.filter((bed) => bed.id !== payload.id);
      gardens = updatedBeds;
    },
    addBed: (gardens, action: PayloadAction<{ id: string }>) => {
      const { payload } = action;

      let gardenIndex = gardens.findIndex((garden) => garden.id === payload.id);
      gardens[gardenIndex].beds?.push({ name: "", id: nanoid() });
    },
  },
});

export const gardenActions = gardenSlice.actions;

export type GardenSlice = {
  [gardenSlice.name]: ReturnType<typeof gardenSlice["reducer"]>;
};

export const gardenSelectors = {
  selectGardens: (state: RootState) => state.gardens,
  // selectBed: (state: RootState, bedId: string) =>
  //   state.garden.beds.find((bed) => bed.id === bedId),
};
