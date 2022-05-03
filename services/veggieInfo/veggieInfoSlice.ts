import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { initialVeggieInfoState } from "./initialVeggieInfoState";

export const veggieInfoSlice = createSlice({
  name: "veggieInfos",
  initialState: initialVeggieInfoState,
  reducers: {},
});

export type VeggieInfoSlice = {
  [veggieInfoSlice.name]: ReturnType<typeof veggieInfoSlice["reducer"]>;
};

export const veggieInfoActions = veggieInfoSlice.actions;

export const veggieInfoSelectors = {
  selectVeggieInfos: (state: RootState) => state.veggieInfos,
  selectVeggieInfo: (state: RootState, id: string) =>
    state.veggieInfos.find((info) => info.id === id),
};
