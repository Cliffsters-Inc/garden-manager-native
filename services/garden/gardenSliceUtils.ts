import { RootState } from "../../store";
import { Veggie, VeggieLog } from "../types";

export const appendVeggieInfoToVeggie = (
  state: RootState,
  veggie: Veggie
): Veggie => {
  const veggieInfo = state.veggieInfos.find(
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
};

export const sortLogsByDate = (logs: VeggieLog[], descending = true) =>
  logs.slice().sort((a, b) => (descending ? b.date - a.date : a.date - b.date));
