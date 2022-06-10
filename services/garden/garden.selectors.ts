import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { VeggieLog } from "../types";
import { veggieInfoSelectors } from "../veggieInfo/veggieInfoSlice";

const selectGardens = (state: RootState) => state.gardens;

// Reference for selectors with arguments https://stackoverflow.com/questions/40291084/use-reselect-selector-with-parameters
const selectGarden = createSelector(
  [selectGardens, (_state: RootState, gardenId: string) => gardenId],
  (gardens, gardenId) => gardens.find((garden) => garden.id === gardenId)
);

const selectBed = createSelector(
  [
    selectGarden,
    (_state: RootState, _gardenId: string, bedId: string) => bedId,
  ],
  (garden, bedId) => garden?.beds?.find((bed) => bed.id === bedId)
);

const selectGlobalLogs = createSelector(
  [
    // Usual first input - extract value from `state`
    (state) => state.gardens,
    // Take the second arg, `category`, and forward to the output selector
    (gardens) => gardens,
  ],
  // Output selector gets (`items, category)` as args
  (gardensList) => {
    const gardens = gardensList;

    const logs: any[] = [];
    gardens.map((gardens: any) =>
      gardens.beds?.map((bed: any) =>
        bed.veggies?.map((veg: any) =>
          veg.logs.forEach((e: any) => logs.push(e))
        )
      )
    );
    return logs;
  }
);

const selectBedWithVeggieInfo = createSelector(
  [
    veggieInfoSelectors.selectVeggieInfos,
    (state: RootState, selectedGardenId: string, selectedBedId: string) =>
      selectBed(state, selectedGardenId, selectedBedId),
  ],
  (veggieInfos, bed) => {
    if (!bed?.veggies) return bed;

    const veggiesWithInfo = bed.veggies.map((veggie) => {
      // Coded immutably as Redux TK only wraps immer on reducers
      const veggieInfo = veggieInfos.find(
        (veggieInfo) => veggieInfo.id === veggie.veggieInfo.id
      );

      return {
        ...veggie,
        veggieInfo: {
          ...veggie.veggieInfo,
          name: veggieInfo?.name,
          image: veggieInfo?.image,
        },
      };
    });

    return { ...bed, veggies: veggiesWithInfo };
  }
);

const selectVeggie = createSelector(
  [
    selectBedWithVeggieInfo,
    (
      _state: RootState,
      _selectedGardenId: string,
      _selectedBedId: string,
      veggieId: string
    ) => veggieId,
  ],
  (bed, veggieId) => bed?.veggies?.find((veggie) => veggie.id === veggieId)
);

const selectVeggieWithSortedLogs = createSelector(
  [
    selectVeggie,
    (
      _state: RootState,
      _selectedGardenId: string,
      _selectedBedId: string,
      _veggieId: string,
      logsDescending: boolean
    ) => logsDescending,
  ],
  (veggie, logsDescending) => {
    const sortLogsByDate = (logs: VeggieLog[], descending = true) =>
      logs
        .slice()
        .sort((a, b) => (descending ? b.date - a.date : a.date - b.date));

    return {
      ...veggie,
      logs: veggie && sortLogsByDate(veggie.logs, logsDescending),
    };
  }
);

const selectVeggieLog = createSelector(
  [
    selectVeggie,
    (
      _state: RootState,
      _selectedGardenId: string,
      _selectedBedId: string,
      _veggieId: string,
      logId: string
    ) => logId,
  ],
  (veggie, logId) => veggie?.logs.find((log) => log.id === logId)
);

export const gardenSelectors = {
  selectGardens,
  selectGarden,
  selectBed,
  selectBedWithVeggieInfo,
  selectVeggie,
  selectGlobalLogs,
  selectVeggieWithSortedLogs,
  selectVeggieLog,
};
