import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../store";
import { FS } from "../../utils/fileSystem";
import { LoadingStates } from "../types";

type SliceState = {
  previewingPhoto: string | null;
  cachedPhotos: string[];
  errorMsg: string | null;
  loading: LoadingStates;
};
const initialState: SliceState = {
  previewingPhoto: null,
  cachedPhotos: [],
  errorMsg: null,
  loading: "idle",
};

type CachedUri = string;

export const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setPhotoPreview: (state, action: PayloadAction<CachedUri>) => {
      state.previewingPhoto = action.payload;
    },
    confirmPhotoPreview: (state) => {
      const { previewingPhoto } = state;
      if (previewingPhoto) state.cachedPhotos.push(previewingPhoto);
      state.previewingPhoto = null;
    },
    cancelPhotoPreview: (state) => {
      state.previewingPhoto = null;
    },
    addCachedPhoto: (state, action: PayloadAction<CachedUri>) => {
      state.cachedPhotos.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeCachedPhoto.fulfilled, (state, action) => {
        const cachedUri = action.payload;
        state.cachedPhotos = state.cachedPhotos.filter(
          (uri) => uri !== cachedUri
        );
        state.errorMsg = null;
        state.loading = "succeeded";
      })
      .addCase(removeCachedPhoto.rejected, (state, action) => {
        console.error(action.error);
        state.errorMsg = "Cached photo could not be deleted";
        state.loading = "failed";
      })
      .addCase(removeCachedPhoto.pending, (state) => {
        state.loading = "pending";
      });
  },
});

const cancelPhotoPreview = (): AppThunk => async (dispatch, getState) => {
  try {
    const state = getState();
    const previewingPhoto = selectPreviewPhoto(state);
    if (previewingPhoto) {
      dispatch(removeCachedPhoto(previewingPhoto));
      dispatch(photoSliceActions.cancelPhotoPreview());
    }
  } catch (error) {
    throw error;
  }
};

const removeCachedPhoto = createAsyncThunk(
  "photos/removeCachedPhoto",
  async (cachedUri: CachedUri) => {
    try {
      await FS.deleteItem.byUri(cachedUri);
      return cachedUri;
    } catch (error) {
      throw error;
    }
  }
);

const removeAllCachedPhotos = (): AppThunk => (dispatch, getState) => {
  const state = getState();
  const cachedPhotos = state.photos.cachedPhotos;
  cachedPhotos.forEach((cachedUri) => dispatch(removeCachedPhoto(cachedUri)));
};

const photoThunks = {
  removeCachedPhoto,
  removeAllCachedPhotos,
  cancelPhotoPreview,
};
const photoSliceActions = photoSlice.actions;

export const photoActions = { ...photoSliceActions, ...photoThunks };

export type PhotoSlice = {
  [photoSlice.name]: ReturnType<typeof photoSlice["reducer"]>;
};

const selectPhotosState = (state: RootState) => state.photos;
const selectPreviewPhoto = createSelector(
  selectPhotosState,
  (state) => state.previewingPhoto
);
const selectAllCachedPhotos = createSelector(
  selectPhotosState,
  (state) => state.cachedPhotos
);
export const photoSelectors = {
  selectPhotosState,
  selectPreviewPhoto,
  selectAllCachedPhotos,
};
