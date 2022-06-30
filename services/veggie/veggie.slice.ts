import {
  createEntityAdapter,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { logSliceActions } from "../log/log.slice";
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
    add: {
      prepare: (payload: Omit<VeggieNormalised, "id">) => ({
        payload: { ...payload, id: nanoid() },
      }),
      reducer: veggieAdaptor.addOne,
    },
    remove: veggieAdaptor.removeOne,
    update: veggieAdaptor.updateOne,
    linkLog: (
      state,
      action: PayloadAction<{ veggieId: string; logId: string }>
    ) => {
      const { veggieId, logId } = action.payload;
      state.entities[veggieId]?.logs.push(logId);
    },
    unlinkLog: (
      state,
      action: PayloadAction<{ veggieId: string; logId: string }>
    ) => {
      const { veggieId, logId } = action.payload;
      const veggie = state.entities[veggieId];

      if (veggie) {
        const updatedLogs = veggie.logs.filter(
          (veggiesLogId) => veggiesLogId !== logId
        );
        veggie.logs = updatedLogs;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logSliceActions.add, (state, action) => {
      const newLog = action.payload;
      const logsVeggie = state.entities[newLog.veggie];
      logsVeggie?.logs.push(newLog.id);
    });
  },
});

export const veggieSliceActions = veggieSlice.actions;

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
