import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { initialGardenState } from "./initialGardenState";
import { RootState } from "../../store";
import { mockData } from "../mockData";

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
    removeGarden: (gardens, action: PayloadAction<{ id: string }>) => {
      const { payload } = action;

      const updatedBeds = gardens.filter((bed) => bed.id !== payload.id);
      gardens = updatedBeds;
    },
    addBed: (gardens, action: PayloadAction<{ name: string; id: string }>) => {
      const { payload } = action;

      let gardenIndex = gardens.findIndex((garden) => garden.id === payload.id);
      gardens[gardenIndex].beds?.push({
        name: payload.name,
        id: nanoid(),
        veggies: [],
      });
    },
    addVeggie: (
      gardens,
      action: PayloadAction<{
        gardenId: string;
        bedId: string;
        veggieInfoId: string;
      }>
    ) => {
      const { gardenId, bedId, veggieInfoId } = action.payload;

      const garden = gardens.find((garden) => garden.id === gardenId);
      const bed = garden?.beds?.find((bed) => bed.id === bedId);

      const veggieInfo = mockData.veggieInfos.find(
        (veggieInfo) => veggieInfo.id === veggieInfoId
      );

      if (bed && veggieInfo) {
        bed?.veggies?.push({
          id: nanoid(),
          name: veggieInfo.name,
          veggieInfoId,
        });
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
  selectBed: (state: RootState, gardenId: string, bedId: string) =>
    state.gardens
      .find((garden) => garden.id === gardenId)
      ?.beds?.find((bed) => bed.id === bedId),
  // selectBed: (state: RootState, bedId: string) =>
  //   state.garden.beds.find((bed) => bed.id === bedId),
};
