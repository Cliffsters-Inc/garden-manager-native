import { renderApp, fireEvent, waitFor } from "../../testing/test-utils";

describe("<VeggieScreen />", () => {
  it("update veggie notes and add, edit, delete & reorder logs", async () => {
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
    await waitFor(() => expect(getByText(/add garden/i)));
    const addGardenBtn = getByText(/add garden/i);
    fireEvent.press(addGardenBtn);
    const gardenNameField = getByPlaceholderText(/new garden name/i);
    fireEvent.changeText(gardenNameField, "TestGarden123");
    const createGardenDoneBtn = getAllByText(/done/i)[0];
    fireEvent.press(createGardenDoneBtn);
    await findByText("TestGarden123");

    // navigates to beds screen
    const newGarden = getByText("TestGarden123");
    fireEvent.press(newGarden);

    // creates new bed
    const addBedBtn = getByText(/add bed/i);
    fireEvent.press(addBedBtn);
    const bedNameField = getByPlaceholderText(/new bed name/i);
    fireEvent.changeText(bedNameField, "TestBed123");
    const createBedDoneBtn = getAllByText(/done/i)[0];
    fireEvent.press(createBedDoneBtn);
    const newBed = await findByText("TestBed123");

    // navigates to bed
    fireEvent.press(newBed);

    // adds new eggplant veggie
    const newVeggieBtn = getByText(/add veggie/i);
    fireEvent.press(newVeggieBtn);
    const eggplantAddBtn = getByTestId(/eggplant-add-btn/i);
    fireEvent.press(eggplantAddBtn);
    const eggplant = getByText(/^eggplant$/i);
    expect(eggplant).toBeDefined();

    // navigates to eggplant
    fireEvent.press(eggplant);

    // adds log
    const addLogBtn = getByText(/add log/i);
    fireEvent.press(addLogBtn);
    const notesField = getByPlaceholderText(/notes/i);
    fireEvent.changeText(notesField, "log note test");
    const createLogBtn = getAllByText(/^add$/i)[0];
    fireEvent.press(createLogBtn);
    const newLog = getByText("Notes: log note test");
    expect(newLog).toBeDefined();

    // update log notes
    fireEvent.press(newLog);
    const newLogNotesField = getByDisplayValue("log note test");
    fireEvent.changeText(newLogNotesField, "updated note");
    const updateLogBtn = getAllByText(/^done$/i)[0];
    fireEvent.press(updateLogBtn);
    const updatedLog = getByText("Notes: updated note");
    expect(updatedLog).toBeDefined();

    // deletes log
    fireEvent.press(updatedLog);
    const deleteBtn = getByText(/^delete this log$/i);
    fireEvent.press(deleteBtn);
    const deleteConfirmationBtn = getByText(/^delete log$/i);
    fireEvent.press(deleteConfirmationBtn);
    const deletedLog = queryByText("Notes: updated note");
    expect(deletedLog).toBeNull();
  });
});
