import { normalize } from "normalizr";
import { gardensSchema } from "../garden/garden.schemas";
import { initialGardenState } from "../garden/initialGardenState";
import {
  BedNormalised,
  GardenNormalised,
  VeggieLogNormalised,
  VeggieNormalised,
} from "../types";

type NormalizedData<T> = { [key: string]: T };

export type GardenNormalisedState = {
  gardens: NormalizedData<GardenNormalised>;
  beds: NormalizedData<BedNormalised>;
  veggies: NormalizedData<VeggieNormalised>;
  logs: NormalizedData<VeggieLogNormalised>;
};

export const getInitialNormalisedGardenData = () => {
  // normalize requires generic arguments https://redux-toolkit.js.org/usage/usage-with-typescript#using-createentityadapter-with-normalizr
  const normalisedData = normalize<any, GardenNormalisedState>(
    initialGardenState,
    gardensSchema
  );
  return normalisedData.entities;
};
