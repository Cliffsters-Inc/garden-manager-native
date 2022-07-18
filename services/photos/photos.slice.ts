import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../store";
import { FS, DirName, FileUri } from "../../utils/fileSystem";
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

export const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setPhotoPreview: (state, action: PayloadAction<FileUri>) => {
      state.previewingPhoto = action.payload;
      state.cachedPhotos.push(action.payload);
    },
    clearPhotoPreview: (state) => {
      state.previewingPhoto = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCachedPhotos.fulfilled, (state, action) => {
        state.cachedPhotos = action.payload;
      })
      .addCase(deleteAllCachePhotos.fulfilled, (state, _action) => {
        state.cachedPhotos = [];
      })
      .addCase(deleteCachedPhoto.fulfilled, (state, action) => {
        const updatedCachePhotos = action.payload;
        state.cachedPhotos = updatedCachePhotos;
        state.errorMsg = null;
        state.loading = "succeeded";
      })
      .addCase(deleteCachedPhoto.rejected, (state) => {
        state.errorMsg = "Cached photo could not be deleted";
        state.loading = "failed";
      })
      .addCase(deleteCachedPhoto.pending, (state) => {
        state.loading = "pending";
      });
  },
});

const fetchPhotoDocDirectory = createAsyncThunk(
  "photos/fetchPhotoDocDirectory",
  async (dirName: DirName) => {
    try {
      const contents = await FS.getDirectoryContents.inDocs(
        "photos/" + dirName,
        { appendUri: true }
      );

      return contents;
    } catch (error) {
      throw error;
    }
  }
);
const fetchCachedPhotos = createAsyncThunk(
  "photos/fetchCachedPhotos",
  async () => {
    try {
      return await FS.getDirectoryContents.inCache("Camera", {
        appendUri: true,
      });
    } catch (error) {
      throw error;
    }
  }
);

const deleteDocPhotoDirectory = createAsyncThunk(
  "photos/deleteDocPhotoDirectory",
  async (dirName: DirName) => {
    try {
      await FS.deleteItem.inDocs("photos/" + dirName);
    } catch (error) {
      fetchPhotoDocDirectory(dirName);
      throw error;
    }
  }
);
const deleteDocPhoto = createAsyncThunk(
  "photos/deleteDocPhoto",
  async (docUri: string) => {
    try {
      const dirName = docUri.split("/").at(-2);
      await FS.deleteItem.byUri(docUri);
      const updatedDirPhotos = await FS.getDirectoryContents.inDocs(
        "photos/" + dirName
      );
      return updatedDirPhotos;
    } catch (error) {
      throw error;
    }
  }
);

const deleteAllCachePhotos = createAsyncThunk(
  "photos/deleteAllCachePhotos",
  async () => {
    try {
      await FS.deleteItem.inCache("Camera");
    } catch (error) {
      fetchCachedPhotos();
      throw error;
    }
  }
);
const deleteCachedPhoto = createAsyncThunk(
  "photos/deleteCachedPhoto",
  async (cachedUri: FileUri) => {
    try {
      await FS.deleteItem.byUri(cachedUri);
      const updatedCachePhotos = await FS.getDirectoryContents.inCache(
        "Camera",
        { appendUri: true }
      );
      return updatedCachePhotos;
    } catch (error) {
      throw error;
    }
  }
);
const deletePreviewPhoto = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const previewPhoto = selectPreviewPhoto(state);
  if (previewPhoto) {
    dispatch(deleteCachedPhoto(previewPhoto));
    dispatch(photoSliceActions.clearPhotoPreview());
  }
};

const moveCachePhotosToDocDirectory = createAsyncThunk(
  "photos/moveCachePhotosToDocDirectory",
  async (dirName: DirName) => {
    try {
      await FS.moveDirContents({
        fromUri: FS.rootCacheLocation + "Camera",
        toUri: `${FS.rootDocumentLocation}photos/${dirName}`,
      });
    } catch (error) {
      throw error;
    }
  }
);

const photoThunkActions = {
  fetchPhotoDocDirectory,
  fetchCachedPhotos,
  deleteDocPhoto,
  deleteDocPhotoDirectory,
  deleteAllCachePhotos,
  deleteCachedPhoto,
  deletePreviewPhoto,
  moveCachePhotosToDocDirectory,
};
const photoSliceActions = photoSlice.actions;
export const photoActions = { ...photoSliceActions, ...photoThunkActions };

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
