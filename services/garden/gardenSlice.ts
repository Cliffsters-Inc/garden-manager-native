import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { Garden } from "../types";
import { initialState } from "../initialState";

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
