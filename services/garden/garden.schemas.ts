import { schema } from "normalizr";
import { veggieInfoEntity } from "../veggieInfo/veggieInfo.schemas";

export const gardenEntity = new schema.Entity("gardens");

export const bedEntity = new schema.Entity("beds", { garden: gardenEntity });

export const veggieEntity = new schema.Entity("veggies", {
  garden: gardenEntity,
  bed: bedEntity,
  veggieInfo: veggieInfoEntity,
});

export const logEntity = new schema.Entity("logs", {
  garden: gardenEntity,
  bed: bedEntity,
  veggie: veggieEntity,
});
