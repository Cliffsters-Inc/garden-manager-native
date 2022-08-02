import { normalize } from "normalizr";

import { initialGardenState } from "../../testing/stubs/initialGardenState";
import { initialGardenStateNormalised } from "../../testing/stubs/initialGardenStateNormalised";
import { gardensSchema } from "../garden/garden.schemas";

describe("garden schemas", () => {
  it("garden schema nomalizes garden data", () => {
    const normalisedData = normalize(initialGardenState, gardensSchema);
    expect(initialGardenStateNormalised).toEqual(normalisedData.entities);
  });
});
