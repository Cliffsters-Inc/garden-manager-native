import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
  nanoid,
} from "@reduxjs/toolkit";

import { AppThunk, RootState } from "../../store";
import { VeggieLogNormalised } from "../entity.types";
import { photoActions } from "../photos/photos.slice";
import { getInitialNormalisedGardenData } from "../utils/getInitialNormalisedGardenData";
import { veggieActions } from "../veggie/veggie.slice";

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
    builder.addCase(fetchLogPhotos.fulfilled, (state, action) => {
      const logId = action.meta.arg;
      const log = state.entities[logId];
      if (log) {
        log.photos.entities = action.payload;
        log.photos.loading = "succeeded";
      }
    });
  },
});

const remove =
  (logId: EntityId): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const log = state.logs.entities[logId];
    dispatch(photoActions.deletePhotosDirectory("logs/" + logId));
    dispatch(logSliceActions.remove(logId));

    const veggie = log && state.veggies.entities[log.veggie];
    if (veggie) {
      dispatch(veggieActions.unlinkLog({ veggieId: veggie.id, logId: log.id }));
    }
  };

const fetchLogPhotos = createAsyncThunk(
  "logs/fetchLogPhotos",
  async (logId: EntityId, { dispatch }) => {
    try {
      const photos = await dispatch(
        photoActions.fetchPhotoDocDirectory("logs/" + logId)
      ).unwrap();

      return photos;
    } catch (error) {
      throw error;
    }
  }
);

const moveCachePhotosToLogDir = createAsyncThunk(
  "logs/moveCachePhotosToLogDir",
  async (logId: EntityId, { dispatch }) => {
    await dispatch(photoActions.moveCachePhotosToStorage("logs/" + logId));
    await dispatch(fetchLogPhotos(logId));
  }
);

const logThunkActions = { remove, fetchLogPhotos, moveCachePhotosToLogDir };
const logSliceActions = logSlice.actions;
export const logActions = { ...logSliceActions, ...logThunkActions };

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
