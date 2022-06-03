import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { VeggieNormalised } from "../types";
import { getInitialNormalisedGardenData } from "../utils/getInitialNormalisedGardenData";

const veggieAdaptor = createEntityAdapter<VeggieNormalised>();

// initializing createEntityAdapter state https://github.com/reduxjs/redux-toolkit/issues/493#issuecomment-612471868
const preInitialisedState = veggieAdaptor.getInitialState();
const normalisedVeggieData = getInitialNormalisedGardenData().veggies;
const initialisedState = veggieAdaptor.upsertMany(
  preInitialisedState,
  normalisedVeggieData
);

export const veggieSlice = createSlice({
  name: "veggies",
  initialState: initialisedState,
  reducers: {
    add: veggieAdaptor.addOne,
    remove: veggieAdaptor.removeOne,
    update: veggieAdaptor.updateOne,
  },
});

export const veggieActions = veggieSlice.actions;

export type VeggieSlice = {
  [veggieSlice.name]: ReturnType<typeof veggieSlice["reducer"]>;
};

const genericSelectors = veggieAdaptor.getSelectors<VeggieSlice>(
  (state) => state[veggieSlice.name]
);

const customSelectors = {
  selectByIds: (state: RootState, ids: string[]) =>
    ids.map((id) => state[veggieSlice.name].entities[id]!),
};

export const veggieSelectors = {
  ...genericSelectors,
  ...customSelectors,
};
