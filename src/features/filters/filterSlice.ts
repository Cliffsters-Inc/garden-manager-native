import { createSlice } from "@reduxjs/toolkit";

interface filterState {
  activeFilter: boolean;
  //   filterByDate: boolean;
  logsBydate: string[];
  filterByPic: boolean;
  logsWithPics: string[];
  //   filteredLogs: any;
  filteredLogs: string[][];
  test: string[];
}

const initialState: filterState = {
  activeFilter: false,
  //   filterByDate,
  logsBydate: [],
  filterByPic: false,
  logsWithPics: ["test"],
  filteredLogs: [["test2"]],
  test: ["test"],
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    switchActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    // switchFilterByDate: (state) => {
    //   state.filterByDate = !state.filterByDate;
    // },
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
      //   console.log("test");
      //   let occupiedArrays: string[][] = [];
      //   const addIfOccupied = (...arrays: string[][]) => {
      //     arrays.forEach((arr) => {
      //       if (arr.length > 0) {
      //         occupiedArrays = [...occupiedArrays, arr];
      //       }
      //     });
      //   };
      //   addIfOccupied(state.logsBydate, state.logsWithPics);
      //   state.filteredLogs = occupiedArrays;
      //   state.activeFilter = true;
      //   console.log("occArr", occupiedArrays);
      state.filteredLogs = [["test"]];
    },
    clearFilters: () => initialState,
  },
});

export const {
  switchActiveFilter,
  setLogsByDate,
  switchFilterByPic,
  setLogsWithPics,
  //   filterLogs,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
