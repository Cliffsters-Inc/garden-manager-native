import { createSlice } from "@reduxjs/toolkit";

interface filterState {
  logsBydate: string[];
  filterByPic: boolean;
  logsWithPics: string[];
  filteredLogs: string[][];
}

const initialState: filterState = {
  logsBydate: ["12/12/12"],
  filterByPic: false,
  logsWithPics: ["test"],
  filteredLogs: [["test2"]],
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
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
      state.filteredLogs = [["test"]];
    },
  },
});

export default filterSlice.reducer;
