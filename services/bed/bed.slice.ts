import {
  createEntityAdapter,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../store";
import { gardenActions } from "../garden/garden.slice";
import { BedNormalised } from "../types";
import { getInitialNormalisedGardenData } from "../utils/getInitialNormalisedGardenData";
import { veggieActions } from "../veggie/veggie.slice";

const bedAdaptor = createEntityAdapter<BedNormalised>();

// initializing createEntityAdapter state https://github.com/reduxjs/redux-toolkit/issues/493#issuecomment-612471868
const preInitialisedState = bedAdaptor.getInitialState();
const normalisedBedData = getInitialNormalisedGardenData().beds;
const initialisedState = bedAdaptor.upsertMany(
  preInitialisedState,
  normalisedBedData
);

export const bedSlice = createSlice({
  name: "beds",
  initialState: initialisedState,
  reducers: {
    add: {
      prepare: (payload: Omit<BedNormalised, "id">) => ({
        payload: { ...payload, id: nanoid() },
      }),
      reducer: bedAdaptor.addOne,
    },
    update: bedAdaptor.updateOne,
    remove: bedAdaptor.removeOne,
    removeMany: bedAdaptor.removeMany,
    linkVeggie: (
      state,
      action: PayloadAction<{ bedId: string; veggieId: string }>
    ) => {
      const { bedId, veggieId } = action.payload;
      state.entities[bedId]?.veggies.push(veggieId);
    },
    unlinkVeggie: (
      state,
      action: PayloadAction<{ bedId: string; veggieId: string }>
    ) => {
      const { bedId, veggieId } = action.payload;
      const bed = state.entities[bedId];

      if (bed) {
        const updatedVeggies = bed.veggies.filter(
          (bedsVeggieId) => bedsVeggieId !== veggieId
        );
        bed.veggies = updatedVeggies;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(veggieActions.add, (state, action) => {
      const newVeggie = action.payload;
      const veggiesBed = state.entities[newVeggie.bed];
      veggiesBed?.veggies.push(newVeggie.id);
    });
  },
});

const bedThunkActions = {
  remove:
    (bedId: string): AppThunk =>
    (dispatch, getState) => {
      const state = getState();
      const bed = state.beds.entities[bedId];
      dispatch(bedSliceActions.remove(bedId));

      if (bed?.veggies) {
        bed.veggies.forEach((veggieId) =>
          dispatch(veggieActions.remove(veggieId))
        );
      }

      const garden = bed && state.gardens.entities[bed.garden];
      if (garden) {
        dispatch(gardenActions.unlinkBed({ gardenId: garden.id, bedId }));
      }
    },
};
const bedSliceActions = bedSlice.actions;
export const bedActions = { ...bedSliceActions, ...bedThunkActions };

export type BedSlice = {
  [bedSlice.name]: ReturnType<typeof bedSlice["reducer"]>;
};

const genericSelectors = bedAdaptor.getSelectors<BedSlice>(
  (state) => state[bedSlice.name]
);

const customSelectors = {
  selectByIds: (state: RootState, ids: string[]) =>
    ids.map((id) => state[bedSlice.name].entities[id]!),
  selectByGarden: (state: RootState, gardenId: string) =>
    genericSelectors.selectAll(state).filter((bed) => bed.garden === gardenId),
};

export const bedSelectors = {
  ...genericSelectors,
  ...customSelectors,
};
