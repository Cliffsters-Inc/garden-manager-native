import {
  createEntityAdapter,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import { bedActions } from "../bed/bed.slice";
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
  reducers: {
    add: {
      prepare: (payload: Omit<GardenNormalised, "id">) => ({
        payload: { ...payload, id: nanoid() },
      }),
      reducer: gardenAdaptor.addOne,
    },
    update: gardenAdaptor.updateOne,
    remove: gardenAdaptor.removeOne,
    linkBed: (
      state,
      action: PayloadAction<{ gardenId: string; bedId: string }>
    ) => {
      const { gardenId, bedId } = action.payload;
      state.entities[gardenId]?.beds.push(bedId);
    },
    unlinkBed: (
      state,
      action: PayloadAction<{ gardenId: string; bedId: string }>
    ) => {
      const { gardenId, bedId } = action.payload;
      const garden = state.entities[gardenId];

      if (garden) {
        const updatedBeds = garden?.beds?.filter(
          (gardensBedId) => gardensBedId !== bedId
        );
        garden.beds = updatedBeds;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(bedActions.add, (state, action) => {
      const newBed = action.payload;
      const bedsGarden = state.entities[newBed.garden];
      bedsGarden?.beds.push(newBed.id);
    });
  },
});

const gardenThunks = {
  remove:
    (gardenId: string): AppThunk =>
    (dispatch, getState) => {
      const state = getState();
      const garden = state.gardens.entities[gardenId];
      dispatch(gardenSliceActions.remove(gardenId));

      if (garden?.beds) {
        garden.beds.forEach((bedId) => dispatch(bedActions.remove(bedId)));
      }
    },
};
const gardenSliceActions = gardenSlice.actions;
export const gardenActions = { ...gardenSliceActions, ...gardenThunks };

export type GardenSlice = {
  [gardenSlice.name]: ReturnType<typeof gardenSlice["reducer"]>;
};

export const gardenSelectors = gardenAdaptor.getSelectors<GardenSlice>(
  (state) => state[gardenSlice.name]
);
