import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { initialGardenState } from "./initialGardenState";
import { RootState } from "../../store";
import { VeggieInfo, VeggieLog } from "../types";
import { appendVeggieInfoToVeggie, sortLogsByDate } from "./gardenSliceUtils";

export const gardenSlice = createSlice({
  name: "gardens",
  initialState: initialGardenState,
  reducers: {
    addGarden: (gardens, action: PayloadAction<{ name: string }>) => {
      const { payload } = action;

      gardens.push({
        name: payload.name,
        id: nanoid(),
        beds: [{ name: "1", id: nanoid(), veggies: [] }],
      });
    },
    removeGarden: (gardens, action: PayloadAction<string>) => {
      const { payload } = action;
      let gardenIndex = gardens.findIndex((garden) => garden.id === payload);
      if (gardenIndex > -1) {
        gardens.splice(gardenIndex, 1);
      }
    },
    renameGarden: (
      gardens,
      action: PayloadAction<{ id: string; newName?: string }>
    ) => {
      const { payload } = action;
      let gardenIndex: number = gardens.findIndex(
        (garden) => garden.id === payload.id
      );

      gardens[gardenIndex].name = payload.newName;
    },
    addBed: (
      gardens,
      action: PayloadAction<{ name: string; id: String | undefined }>
    ) => {
      const { payload } = action;

      let gardenIndex = gardens.findIndex((garden) => garden.id === payload.id);
      gardens[gardenIndex].beds?.push({
        name: payload.name,
        id: nanoid(),
        veggies: [],
      });
    },
    removeBed: (
      gardens,
      action: PayloadAction<{ gardenId: string; bedId: string | undefined }>
    ) => {
      const { gardenId, bedId } = action.payload;
      const garden = gardens.find((garden) => garden.id === gardenId);
      let bedIndex: number | undefined = garden?.beds?.findIndex(
        (bed) => bed.id === bedId
      );
      if (bedIndex !== undefined && bedIndex > -1) {
        garden?.beds?.splice(bedIndex, 1);
        console.log("***action");
      }
    },
    renameBed: (
      gardens,
      action: PayloadAction<{
        selectedGardenId: string;
        selectedBedId?: string | undefined;
        newName: string | undefined;
      }>
    ) => {
      const { payload } = action;
      const garden = gardens.find(
        (garden) => garden.id === payload.selectedGardenId
      );
      const bed = garden?.beds?.find((bed) => bed.id === payload.selectedBedId);

      if (bed) {
        console.log("bedAction");
        bed.name = payload.newName;
      }
    },
    addVeggie: (
      gardens,
      action: PayloadAction<{
        selectedGardenId: string;
        selectedBedId: string;
        veggieInfo: VeggieInfo;
      }>
    ) => {
      const { selectedGardenId, selectedBedId, veggieInfo } = action.payload;

      const garden = gardens.find((garden) => garden.id === selectedGardenId);
      const bed = garden?.beds?.find((bed) => bed.id === selectedBedId);

      if (bed && veggieInfo) {
        bed?.veggies?.push({
          id: nanoid(),
          veggieInfo: { id: veggieInfo.id },
          logs: [],
        });
      }
    },
    updateVeggieField: (
      gardens,
      action: PayloadAction<{
        selectedGardenId: string;
        selectedBedId: string;
        veggieId: string;
        field: "notes" | "sowDate" | "harvestDate";
        update: string;
      }>
    ) => {
      const { selectedGardenId, selectedBedId, veggieId, field, update } =
        action.payload;

      const garden = gardens.find((garden) => garden.id === selectedGardenId);
      const bed = garden?.beds?.find((bed) => bed.id === selectedBedId);
      const veggie = bed?.veggies?.find((veggie) => veggie.id === veggieId);
      if (veggie) veggie[field] = update;
    },
    addVeggieLog: (
      gardens,
      action: PayloadAction<{
        selectedGardenId: string;
        selectedBedId: string;
        veggieId: string;
        newLog: Pick<VeggieLog, "date" | "notes">;
      }>
    ) => {
      const { selectedGardenId, selectedBedId, veggieId, newLog } =
        action.payload;
      const garden = gardens.find((garden) => garden.id === selectedGardenId);
      const bed = garden?.beds?.find((bed) => bed.id === selectedBedId);
      const veggie = bed?.veggies?.find((veggie) => veggie.id === veggieId);

      veggie?.logs?.push({ id: nanoid(), ...newLog });
    },
    updateVeggieLog: (
      gardens,
      action: PayloadAction<{
        selectedGardenId: string;
        selectedBedId: string;
        veggieId: string;
        updatedLog: Pick<VeggieLog, "id" | "date" | "notes">;
      }>
    ) => {
      const { selectedGardenId, selectedBedId, veggieId, updatedLog } =
        action.payload;
      const garden = gardens.find((garden) => garden.id === selectedGardenId);
      const bed = garden?.beds?.find((bed) => bed.id === selectedBedId);
      const veggie = bed?.veggies?.find((veggie) => veggie.id === veggieId);

      const logIndex = veggie?.logs.findIndex(
        (log) => log.id === updatedLog.id
      );

      if (logIndex && veggie?.logs[logIndex]) {
        veggie.logs[logIndex] = updatedLog;
      }
    },
  },
});

export const gardenActions = gardenSlice.actions;

export type GardenSlice = {
  [gardenSlice.name]: ReturnType<typeof gardenSlice["reducer"]>;
};

export const gardenSelectors = {
  selectGardens: (state: RootState) => state.gardens,
  selectCurrentGarden: (state: RootState, gardenId: string) => {
    const selectedGarden = state.gardens.find(
      (garden) => garden.id === gardenId
    );

    return selectedGarden;
  },
  selectCurrentBed: (state: RootState, gardenId: string, bedId?: string) => {
    // Coded immutably as Redux TK only wraps immer on reducers
    const bed = state.gardens
      .find((garden) => garden.id === gardenId)
      ?.beds?.find((bed) => bed.id === bedId);

    if (!bed?.veggies) return bed;

    const veggiesWithInfo = bed.veggies.map((veggie) =>
      appendVeggieInfoToVeggie(state, veggie)
    );

    return { ...bed, veggies: veggiesWithInfo };
  },
  selectVeggie: (
    state: RootState,
    gardenId: string,
    bedId: string,
    veggieId: string,
    logsDescending = true
  ) => {
    const veggie = state.gardens
      .find((garden) => garden.id === gardenId)
      ?.beds?.find((bed) => bed.id === bedId)
      ?.veggies?.find((veggie) => veggie.id === veggieId);

    if (!veggie) return null;

    const veggieWithInfo = appendVeggieInfoToVeggie(state, veggie);

    const sortedLogs = sortLogsByDate(veggieWithInfo.logs, logsDescending);

    return { ...veggieWithInfo, logs: sortedLogs };
  },
};
