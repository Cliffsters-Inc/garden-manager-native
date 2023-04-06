import { createSlice } from "@reduxjs/toolkit";

interface filterState {
  filterByDate: boolean;
  filterByPic: boolean;
  logsBydate: string[];
  logsWithPics: string[];
  filteredLogs: string[];
}

const initialState: filterState = {
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
    switchFilterByDate: (state, action) => {
      state.filterByDate = action.payload;
    },
    setLogsByDate: (state, action) => {
      state.logsBydate = action.payload;
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
      addIfOccupied(state.logsBydate, state.logsWithPics);

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
  setLogsByDate,
  switchFilterByPic,
  setLogsWithPics,
  filterLogs,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
