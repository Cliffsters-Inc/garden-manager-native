import { schema } from "normalizr";

function createProcessStrategy(parentKey: string) {
  return (value: any, parent: any) => ({
    ...value,
    [parentKey]: parent.id,
  });
}

const logEntity = new schema.Entity(
  "logs",
  {},
  { processStrategy: createProcessStrategy("veggie") }
);

const veggieEntity = new schema.Entity(
  "veggies",
  { logs: [logEntity] },
  { processStrategy: createProcessStrategy("bed") }
);

const bedEntity = new schema.Entity(
  "beds",
  { veggies: [veggieEntity] },
  { processStrategy: createProcessStrategy("garden") }
);

const gardenEntity = new schema.Entity("gardens", { beds: [bedEntity] });

export const gardensSchema = [gardenEntity];
