import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
  nanoid,
  Update,
} from "@reduxjs/toolkit";
import { VeggieLogNormalised } from "../types";
import { getInitialNormalisedGardenData } from "../utils/getInitialNormalisedGardenData";
import { AppThunk, RootState } from "../../store";
import { FS } from "../../utils/fileSystem";
import { veggieActions } from "../veggie/veggie.slice";
import { photoActions } from "../photos/photos.slice";

const logAdaptor = createEntityAdapter<VeggieLogNormalised>();

// initializing createEntityAdapter state https://github.com/reduxjs/redux-toolkit/issues/493#issuecomment-612471868
const preInitialisedState = logAdaptor.getInitialState();
const normalisedLogData = getInitialNormalisedGardenData().logs;
const initialisedState = logAdaptor.upsertMany(
  preInitialisedState,
  normalisedLogData
);

export const logSlice = createSlice({
  name: "logs",
  initialState: initialisedState,
  reducers: {
    add: {
      prepare: (payload: Omit<VeggieLogNormalised, "id">) => ({
        payload: { ...payload, id: nanoid() },
      }),
      reducer: logAdaptor.addOne,
    },
    remove: logAdaptor.removeOne,
    update: logAdaptor.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(
      photoActions.fetchPhotoDocDirectory.fulfilled,
      (state, action) => {
        const dirName = action.meta.arg.split("/").at(-1);

        if (dirName) {
          const matchingLogDir = state.entities[dirName];
          if (matchingLogDir) matchingLogDir.photos.entities = action.payload;
        }
      }
    );
  },
});

const remove =
  (logId: EntityId): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const log = state.logs.entities[logId];
    dispatch(logSliceActions.remove(logId));

    const veggie = log && state.veggies.entities[log.veggie];
    if (veggie) {
      dispatch(veggieActions.unlinkLog({ veggieId: veggie.id, logId: log.id }));
    }
  };

const logThunks = { remove };
const logSliceActions = logSlice.actions;
export const logActions = { ...logSliceActions, ...logThunks };

export type LogSlice = {
  [logSlice.name]: ReturnType<typeof logSlice["reducer"]>;
};

const genericSelectors = logAdaptor.getSelectors<LogSlice>(
  (state) => state[logSlice.name]
);

const customSelectors = {
  selectByIds: (state: RootState, ids: string[]) =>
    ids.map((id) => state[logSlice.name].entities[id]!),
};

export const logSelectors = {
  ...genericSelectors,
  ...customSelectors,
};
