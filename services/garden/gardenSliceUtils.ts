import { RootState } from "../../store";
import { Veggie } from "../types";

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
