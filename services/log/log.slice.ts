import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { VeggieLogNormalised } from "../types";
import { getInitialNormalisedGardenData } from "../utils/getInitialNormalisedGardenData";
import { AppThunk, RootState } from "../../store";
import { FS } from "../../utils/fileSystem";
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
    builder.addCase(logThunks.fetchPhotos.fulfilled, (state, action) => {
      const photos = action.payload;
      const logId = action.meta.arg;
      const log = state.entities[logId];

      if (log && photos)
        log.photos = { entities: photos, loading: "succeeded" };
    });
  },
});

const addPhoto =
  (payload: { logId: string; photoUri: string }): AppThunk =>
  async (dispatch) => {
    const { logId, photoUri } = payload;
    const cachedPhotoLocation = photoUri;
    const photoDirName = `photos/logs/${logId}`;

    try {
      await FS.createDirectory(photoDirName);
      await FS.moveCacheItemToDocDirectory({
        fromCacheUri: cachedPhotoLocation,
        toDocName: photoDirName,
      });
      dispatch(fetchPhotos(logId));
    } catch (error) {
      console.error(error);
    }
  };

const fetchPhotos = createAsyncThunk(
  "logs/fetchPhotos",
  async (logId: string, thunkApi) => {
    const photoDirName = `photos/logs/${logId}`;

    try {
      const logsPhotoUris = await FS.getDirectoryContents(photoDirName);
      return logsPhotoUris;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

const remove =
  (logId: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const log = state.logs.entities[logId];
    dispatch(logSliceActions.remove(logId));

    const veggie = log && state.veggies.entities[log.veggie];
    if (veggie) {
      dispatch(veggieActions.unlinkLog({ veggieId: veggie.id, logId: log.id }));
    }
  };

const logThunks = { addPhoto, fetchPhotos, remove };
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
