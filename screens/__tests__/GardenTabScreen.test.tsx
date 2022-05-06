import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ProviderMock } from "../../testing/ProviderMock.util";

describe("<GardenTabScreen />", () => {
  it("renders gardens", async () => {
    const { findByText, getByText } = render(<ProviderMock />);

    const frontYardGarden = await findByText(/^frontyard$/i);
    expect(frontYardGarden).toBeDefined();

    const addGardenBtn = getByText(/add new garden/i);
    expect(addGardenBtn).toBeDefined();
  });

  it.todo("can rename a garden");
  it.todo("can delete a garden");
  describe("<BedsTabScreen />", () => {
    it.todo("renders beds");
    it.todo("can add a new bed");
    it.todo("can rename a bed");
    it.todo("can delete a bed");
    describe("<BedsTabScreen />", () => {
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
});
