import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ProviderMock } from "../../testing/ProviderMock.util";

describe("<BedsTabScreen />", () => {
  it.todo("renders beds");

  it.todo("can add a new bed");

  it.todo("can rename a bed");

  it.todo("can delete a bed");

  describe("<Veggie />", () => {
    it.todo("renders veggies");

    it.todo("can add a veggie");

    describe("<VeggieScreen />", () => {
      it.todo("renders a veggie");

      it.todo("renders veggies notes");

      it.todo("renders veggies logs");
      describe("<EditVeggieLogModal />", () => {
        it.todo("can edit a log");

        it.todo("can delete a log");
      });
    });
  });
});
