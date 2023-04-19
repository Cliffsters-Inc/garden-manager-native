import { createSlice } from "@reduxjs/toolkit";

interface filterState {
  activeFilter: boolean;
  logsByTag: string[];
  filterByDate: boolean;
  logsBydate: string[];
  filterByLocation: boolean;
  logsByLocation: string[];
  filterByPic: boolean;
  logsWithPics: string[];
  filteredLogsIds: string[];
  [key: string]: boolean | string[];
}

const initialState: filterState = {
  activeFilter: false,
  logsByTag: [],
  filterByDate: false,
  logsBydate: [],
  filterByLocation: false,
  logsByLocation: [],
  filterByPic: false,
  logsWithPics: [],
  filteredLogsIds: [],
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    switchActiveFilter: (state) => {
      const { activeFilter, filteredLogsIds, ...rest } = state;
      const propsSameValue = Object.entries(rest).every(([key, value]) => {
        return JSON.stringify(value) === JSON.stringify(initialState[key]);
      });
      state.activeFilter = !propsSameValue;
    },
    setLogsByTag: (state, action) => {
      state.logsByTag = action.payload;
    },
    switchFilterByDate: (state, action) => {
      state.filterByDate = action.payload;
    },
    setLogsByDate: (state, action) => {
      state.logsBydate = action.payload;
    },
    resetDateFilters: (state) => {
      state.filterByDate = false;
      state.logsBydate = [];
    },
    setLogsByLocation: (state, action) => {
      state.logsByLocation = action.payload;
    },
    switchFilterByPic: (state, action) => {
      state.filterByPic = action.payload;
    },
    setLogsWithPics: (state, action) => {
      state.logsWithPics = action.payload;
    },
    filterLogs: (state) => {
      const activeFilters: string[][] = [];
      const checkIfActive = (...arrays: string[][]) => {
        arrays.forEach((arr) => {
          if (arr.length > 0) {
            activeFilters.push(arr);
          }

          if (state.filterByPic && state.logsWithPics.length === 0) {
            activeFilters.push(state.logsWithPics);
          }
        });
      };
      checkIfActive(
        state.logsBydate,
        state.logsWithPics,
        state.logsByTag,
        state.logsByLocation
      );

      const flattenedArr = activeFilters.flat();
      const matchingElements = flattenedArr.filter((item) => {
        return activeFilters.every((subArr) => subArr.includes(item));
      });

      const unique = [...new Set(matchingElements)];
      state.filteredLogsIds = unique;
    },
    resetFilters: () => initialState,
  },
});

export const {
  switchActiveFilter,
  setLogsByTag,
  switchFilterByDate,
  setLogsByDate,
  resetDateFilters,
  setLogsByLocation,
  switchFilterByPic,
  setLogsWithPics,
  filterLogs,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
