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

  it("can add a new garden", async () => {
    const { findByText, getByText, getAllByText, getByPlaceholderText } =
      render(<ProviderMock />);

    const addGardenBtn = await findByText(/add new garden/i);
    fireEvent.press(addGardenBtn);

    const gardenNameField = getByPlaceholderText(/new garden name/i);
    fireEvent.changeText(gardenNameField, "test garden");

    const doneBtn = getAllByText(/done/i)[0];
    fireEvent.press(doneBtn);

    const newGarden = await waitFor(() => getByText(/^test garden$/i));
    expect(newGarden).toBeDefined();
  });

  it("can rename a garden", async () => {
    const { getByText, findAllByTestId, getByDisplayValue, getAllByText } =
      render(<ProviderMock />);
    const cardEditBtns = await findAllByTestId("custom-card-edit-btn");

    fireEvent.press(cardEditBtns[0]);
    const renameBtn = getByText(/rename/i);
    fireEvent.press(renameBtn);

    const inputField = getByDisplayValue(/frontyard/i);
    fireEvent.changeText(inputField, "updated garden");

    const doneBtn = getAllByText(/done/i)[0];
    fireEvent.press(doneBtn);

    const updatedGarden = await waitFor(() => getByText(/updated garden/i));
    expect(updatedGarden).toBeDefined();
  });

  it("can delete a garden", async () => {
    const { getByText, getAllByText, findByText, getAllByTestId, queryByText } =
      render(<ProviderMock />);
    await findByText(/backyard/i);

    const cardEditBtns = getAllByTestId("custom-card-edit-btn");

    fireEvent.press(cardEditBtns[1]);
    const deleteBtn = getByText(/delete/i);
    fireEvent.press(deleteBtn);

    await waitFor(() => getByText(/cancel/i));
    const confirmationDeleteBtn = await waitFor(
      () => getAllByText(/delete/i)[1]
    );
    fireEvent.press(confirmationDeleteBtn);

    expect(queryByText(/backyard/i)).toBeNull();
  });
});
