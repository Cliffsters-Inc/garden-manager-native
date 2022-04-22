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
    addBed: (
      gardens,
      action: PayloadAction<{ name: string; id: string | undefined }>
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
      console.log("bedIndex: ", bedIndex);
      if (bedIndex !== undefined && bedIndex > -1) {
        garden?.beds?.splice(bedIndex, 1);
        console.log("***action");
      }
    },
    addVeggie: (
      gardens,
      action: PayloadAction<{
        gardenId: string;
        bedId: string;
        veggieInfo: VeggieInfo;
      }>
    ) => {
      const { gardenId, bedId, veggieInfo } = action.payload;

      const garden = gardens.find((garden) => garden.id === gardenId);
      const bed = garden?.beds?.find((bed) => bed.id === bedId);

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
        gardenId: string;
        bedId: string;
        veggieId: string;
        field: "notes" | "sowDate" | "harvestDate";
        update: string;
      }>
    ) => {
      const { gardenId, bedId, veggieId, field, update } = action.payload;

      const garden = gardens.find((garden) => garden.id === gardenId);
      const bed = garden?.beds?.find((bed) => bed.id === bedId);
      const veggie = bed?.veggies?.find((veggie) => veggie.id === veggieId);
      if (veggie) veggie[field] = update;
    },
    addVeggieLog: (
      gardens,
      action: PayloadAction<{
        gardenId: string;
        bedId: string;
        veggieId: string;
        newLog: Pick<VeggieLog, "date" | "notes">;
      }>
    ) => {
      const { gardenId, bedId, veggieId, newLog } = action.payload;
      const garden = gardens.find((garden) => garden.id === gardenId);
      const bed = garden?.beds?.find((bed) => bed.id === bedId);
      const veggie = bed?.veggies?.find((veggie) => veggie.id === veggieId);

      veggie?.logs?.push({ id: nanoid(), ...newLog });
    },
  },
});

export const gardenActions = gardenSlice.actions;

export type GardenSlice = {
  [gardenSlice.name]: ReturnType<typeof gardenSlice["reducer"]>;
};

export const gardenSelectors = {
  selectGardens: (state: RootState) => state.gardens,
  selectBed: (state: RootState, gardenId: string, bedId: string) => {
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
