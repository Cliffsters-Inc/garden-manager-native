import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { GardenNormalised } from "../types";
import { getInitialNormalisedGardenData } from "../utils/getInitialNormalisedGardenData";

const gardenAdaptor = createEntityAdapter<GardenNormalised>();

// initializing createEntityAdapter state https://github.com/reduxjs/redux-toolkit/issues/493#issuecomment-612471868
const preInitialisedState = gardenAdaptor.getInitialState();
const normalisedGardenData = getInitialNormalisedGardenData().gardens;
const initialisedState = gardenAdaptor.upsertMany(
  preInitialisedState,
  normalisedGardenData
);

export const gardenSlice = createSlice({
  name: "gardens",
  initialState: initialisedState,
  reducers: {},
});

export const gardenActions = gardenSlice.actions;

export type GardenSlice = {
  [gardenSlice.name]: ReturnType<typeof gardenSlice["reducer"]>;
};

export const gardenSelectors = gardenAdaptor.getSelectors<GardenSlice>(
  (state) => state[gardenSlice.name]
);
