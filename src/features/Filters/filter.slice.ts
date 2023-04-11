import { createSlice, current } from "@reduxjs/toolkit";

interface filterState {
  activeFilter: boolean;
  logsByTag: string[];
  filterByDate: boolean;
  filterByPic: boolean;
  logsBydate: string[];
  logsWithPics: string[];
  filteredLogs: string[];
  // [key: string]: boolean | string[];
}

const initialState: filterState = {
  activeFilter: false,
  logsByTag: [],
  filterByDate: false,
  logsBydate: [],
  filterByPic: false,
  logsWithPics: [],
  filteredLogs: [],
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    // switchActiveFilter: (state) => {
    //   const { activeFilter, ...rest } = state;
    //   console.log("state", state);
    //   const areAllPropsSame = Object.entries(rest).every(([key, value]) => {
    //     return value === initialState[key];
    //   });
    //   console.log("props", areAllPropsSame);
    // },
    setLogsByTag: (state, action) => {
      state.logsByTag = action.payload;
      // console.log("test log state", initialState);
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
    switchFilterByPic: (state, action) => {
      state.filterByPic = action.payload;
    },
    setLogsWithPics: (state, action) => {
      state.logsWithPics = action.payload;
    },
    filterLogs: (state) => {
      const occupiedArrs: string[][] = [];
      const addIfOccupied = (...arrays: string[][]) => {
        arrays.forEach((arr) => {
          if (arr.length > 0) {
            occupiedArrs.push(arr);
          }
        });
      };
      addIfOccupied(state.logsBydate, state.logsWithPics, state.logsByTag);

      const flattenedArr = occupiedArrs.flat();
      const matchingElements = flattenedArr.filter((item) => {
        return occupiedArrs.every((subArr) => subArr.includes(item));
      });

      const unique = [...new Set(matchingElements)];
      state.filteredLogs = unique;
      // console.log("occ", occupiedArrs);
      // console.log("flat", flattenedArr);
      // console.log("matching", matchingElements);
      // console.log("unique", unique);
    },
    resetFilters: () => initialState,
  },
});

export const {
  setLogsByTag,
  switchFilterByDate,
  setLogsByDate,
  resetDateFilters,
  switchFilterByPic,
  setLogsWithPics,
  filterLogs,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
