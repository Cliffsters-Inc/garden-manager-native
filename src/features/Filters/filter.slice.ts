import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { standardiseDate } from "../../screens/TimelineScreen/DateFilter/date.utils";
import { VeggieLogNormalised } from "../entity.types";

interface FilterState {
  activeFilter: boolean;
  logsByTag: string[];
  logsBydate: string[];
  filterByGarden: boolean;
  logsByLocation: string[];
  filteringByPic: boolean;
  logsWithPics: string[];
  filteredLogsIds: string[];
  [key: string]: boolean | string[];
}

const initialState: FilterState = {
  activeFilter: false,
  logsByTag: [],
  logsBydate: [],
  filterByGarden: false,
  logsByLocation: [],
  filteringByPic: false,
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
    filterByTags: (
      state,
      action: PayloadAction<{
        logs: VeggieLogNormalised[];
        selectedTags: string[];
      }>
    ) => {
      const logs = action.payload.logs;
      const selectedTags = action.payload.selectedTags;
      const matchingLogs = logs
        .filter((log) =>
          log.payloadTags.some((tag) => {
            return selectedTags.includes(tag.tagLabel);
          })
        )
        .map((log) => log.id);

      state.logsByTag = matchingLogs;
    },
    filterByDate: (
      state,
      action: PayloadAction<{
        logs: VeggieLogNormalised[];
        dates: {
          startDate: number | undefined;
          endDate: number | undefined;
        };
      }>
    ) => {
      const logs = action.payload.logs;
      const start = standardiseDate(action.payload.dates.startDate!);
      const end = standardiseDate(action.payload.dates.endDate!);

      const logsInRange = logs
        .filter((log) => {
          const logDate = standardiseDate(log.date);
          return logDate >= start && logDate <= end;
        })
        .map((log) => log.id);

      state.logsBydate = logsInRange;
    },
    resetDateFilters: (state) => {
      state.logsBydate = [];
    },
    filterByGarden: (
      state,
      action: PayloadAction<{
        logs: VeggieLogNormalised[];
        gardenName: string;
      }>
    ) => {
      const logs = action.payload.logs;
      const gardenName = action.payload.gardenName;
      const matchingLogs = logs
        .filter((log) => log.location?.gardenTitle === gardenName)
        .map(({ id }) => id);

      state.logsByLocation = matchingLogs;
    },
    filterByBed: (
      state,
      action: PayloadAction<{
        logs: VeggieLogNormalised[];
        garden: string;
        bedName: string;
      }>
    ) => {
      const logs = action.payload.logs;
      const bedName = action.payload.bedName;
      const garden = action.payload.garden;
      const matchingLogs = logs
        .filter(
          (log) =>
            log.location?.gardenTitle === garden &&
            log.location?.bedTitle === bedName
        )
        .map(({ id }) => id);

      state.logsByLocation = matchingLogs;
    },
    resetLocationFilter: (state) => {
      state.logsByLocation = [];
    },
    filterByPhoto: (state, action) => {
      state.filteringByPic = !state.filteringByPic;

      if (state.filteringByPic) {
        const logs: VeggieLogNormalised[] = action.payload;
        const foundWithPics = logs
          .filter((log) => log.photos.entities.length > 0)
          .map((log) => log.id);
        state.logsWithPics = foundWithPics;
      } else {
        state.logsWithPics = [];
      }
    },
    filterLogs: (state) => {
      const activeFilters: string[][] = [];
      const checkIfActive = (...arrays: string[][]) => {
        arrays.forEach((arr) => {
          if (arr.length > 0) {
            activeFilters.push(arr);
          }

          if (state.filteringByPic && state.logsWithPics.length === 0) {
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
  filterByTags,
  filterByDate,
  resetDateFilters,
  filterByGarden,
  filterByBed,
  resetLocationFilter,
  filterByPhoto,
  filterLogs,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
