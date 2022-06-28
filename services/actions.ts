import { gardenSliceActions } from "./garden/garden.slice";
import { bedSliceActions } from "./bed/bed.slice";
import { veggieSliceActions } from "./veggie/veggie.slice";
import { logSliceActions } from "./log/log.slice";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export const gardenActions = {
  ...gardenSliceActions,
  remove:
    (gardenId: string): AppThunk =>
    (dispatch, getState) => {
      const state = getState();
      const garden = state.gardens.entities[gardenId];
      dispatch(gardenSliceActions.remove(gardenId));

      if (garden?.beds) {
        garden.beds.forEach((bed) => dispatch(bedActions.remove(bed.id)));
      }
    },
};

export const bedActions = {
  ...bedSliceActions,
  remove:
    (bedId: string): AppThunk =>
    (dispatch, getState) => {
      const state = getState();
      const bed = state.beds.entities[bedId];
      dispatch(bedSliceActions.remove(bedId));

      if (bed?.veggies) {
        bed.veggies.forEach((veggie) =>
          dispatch(veggieActions.remove(veggie.id))
        );
      }

      const garden = bed && state.gardens.entities[bed.garden];
      if (garden) {
        dispatch(gardenActions.unlinkBed({ gardenId: garden.id, bedId }));
      }
    },
};

export const veggieActions = {
  ...veggieSliceActions,
  remove:
    (veggieId: string): AppThunk =>
    (dispatch, getState) => {
      const state = getState();
      const veggie = state.veggies.entities[veggieId];
      dispatch(veggieSliceActions.remove(veggieId));

      if (veggie?.logs) {
        veggie.logs.forEach((log) => dispatch(logActions.remove(log.id)));
      }

      const bed = veggie && state.beds.entities[veggie.bed];
      if (bed) {
        dispatch(
          bedActions.unlinkVeggie({ bedId: bed.id, veggieId: veggie.id })
        );
      }
    },
};

export const logActions = {
  ...logSliceActions,
  remove:
    (logId: string): AppThunk =>
    (dispatch, getState) => {
      const state = getState();
      const log = state.logs.entities[logId];
      dispatch(logSliceActions.remove(logId));

      const veggie = log && state.veggies.entities[log.veggie];
      if (veggie) {
        dispatch(
          veggieActions.unlinkLog({ veggieId: veggie.id, logId: log.id })
        );
      }
    },
};
