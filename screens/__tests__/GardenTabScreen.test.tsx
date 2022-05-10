import { renderApp, fireEvent, waitFor } from "../../testing/test-utils";

describe("<GardenTabScreen />", () => {
  it("can add a new garden", async () => {
    const { findByText, getByText, getAllByText, getByPlaceholderText } =
      renderApp();

    const addGardenBtn = await findByText(/add garden/i);
    fireEvent.press(addGardenBtn);

    const gardenNameField = getByPlaceholderText(/new garden name/i);
    fireEvent.changeText(gardenNameField, "TestGarden123");

    const doneBtn = getAllByText(/done/i)[0];
    fireEvent.press(doneBtn);

    const newGarden = await waitFor(() => getByText("TestGarden123"));

    expect(newGarden).toBeDefined();
  });

  it("can rename a garden", async () => {
    const {
      getByText,
      findByTestId,
      getByDisplayValue,
      getAllByText,
      findByText,
      getByPlaceholderText,
    } = renderApp();

    // creates new garden
    const addGardenBtn = await findByText(/add garden/i);
    fireEvent.press(addGardenBtn);
    const gardenNameField = getByPlaceholderText(/new garden name/i);
    fireEvent.changeText(gardenNameField, "TestGarden123");
    const createGardenDoneBtn = getAllByText(/done/i)[0];
    fireEvent.press(createGardenDoneBtn);
    await waitFor(() => getByText("TestGarden123"));

    const cardEditBtn = await findByTestId(
      "custom-card-edit-btn-TestGarden123"
    );
    fireEvent.press(cardEditBtn);

    const renameBtn = getByText(/rename/i);
    fireEvent.press(renameBtn);

    const inputField = getByDisplayValue(/TestGarden123/i);
    fireEvent.changeText(inputField, "UpdatedGarden123");

    const doneBtn = getAllByText(/done/i)[0];
    fireEvent.press(doneBtn);

    const updatedGarden = await waitFor(() => getByText(/UpdatedGarden123/i));
    expect(updatedGarden).toBeDefined();
  });

  it("can delete a garden", async () => {
    const {
      getByText,
      getAllByText,
      findByText,
      queryByText,
      getByPlaceholderText,
      getByTestId,
      findByTestId,
    } = renderApp();

    // creates new garden
    const addGardenBtn = await findByText(/add garden/i);
    fireEvent.press(addGardenBtn);
    const gardenNameField = getByPlaceholderText(/new garden name/i);
    fireEvent.changeText(gardenNameField, "TestGarden123");
    const createGardenDoneBtn = getAllByText(/done/i)[0];
    fireEvent.press(createGardenDoneBtn);
    await waitFor(() => getByText("TestGarden123"));

    const cardEditBtn = await findByTestId(
      "custom-card-edit-btn-TestGarden123"
    );
    fireEvent.press(cardEditBtn);

    const deleteBtn = getByText(/delete/i);
    fireEvent.press(deleteBtn);

    const confirmationDeleteBtn = getByTestId(/delete-confirmation-btn/i);
    fireEvent.press(confirmationDeleteBtn);

    const deletedGarden = queryByText(/^TestGarden123$/i);
    expect(deletedGarden).toBeNull();
  });
});
