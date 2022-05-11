import { renderApp, fireEvent } from "../../testing/test-utils";

describe("<BedsTabScreen />", () => {
  it("can add, rename & delete a bed", async () => {
    const {
      findByText,
      getByPlaceholderText,
      getAllByText,
      getByText,
      getByDisplayValue,
      getByTestId,
      queryByText,
    } = renderApp();

    // creates new garden
    const addGardenBtn = await findByText(/add garden/i);
    fireEvent.press(addGardenBtn);
    const gardenNameField = getByPlaceholderText(/new garden name/i);
    fireEvent.changeText(gardenNameField, "TestGarden123");
    const createGardenDoneBtn = getAllByText(/done/i)[0];
    fireEvent.press(createGardenDoneBtn);
    const newGarden = await findByText("TestGarden123");

    // navigates to beds screen
    fireEvent.press(newGarden);

    // creates new bed
    const addBedBtn = getByText(/add bed/i);
    fireEvent.press(addBedBtn);
    const bedNameField = getByPlaceholderText(/new bed name/i);
    fireEvent.changeText(bedNameField, "TestBed123");
    const createBedDoneBtn = getAllByText(/done/i)[0];
    fireEvent.press(createBedDoneBtn);
    const newBed = await findByText("TestBed123");
    expect(newBed).toBeDefined();

    // renames new bed
    const newBedEditBtn = getByTestId("custom-card-edit-btn-TestBed123");
    fireEvent.press(newBedEditBtn);
    const renameBtn = getByText(/rename/i);
    fireEvent.press(renameBtn);
    const inputField = getByDisplayValue(/TestBed123/i);
    fireEvent.changeText(inputField, "UpdatedBed123");
    const doneBtn = getAllByText(/done/i)[0];
    fireEvent.press(doneBtn);
    const updatedBed = await findByText(/UpdatedBed123/i);
    expect(updatedBed).toBeDefined();

    // deletes new bed
    const updatedBedEditBtn = getByTestId("custom-card-edit-btn-UpdatedBed123");
    fireEvent.press(updatedBedEditBtn);
    const deleteBtn = getByText(/delete/i);
    fireEvent.press(deleteBtn);
    const confirmationDeleteBtn = getByTestId(/delete-confirmation-btn/i);
    fireEvent.press(confirmationDeleteBtn);
    const deletedBed = queryByText(/^UpdatedBed123$/i);
    expect(deletedBed).toBeNull();
  });
});
