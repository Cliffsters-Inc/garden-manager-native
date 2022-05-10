import { renderApp, fireEvent, waitFor } from "../../testing/test-utils";

describe("<VeggieScreen />", () => {
  it("update veggie notes and add, edit, delete & reorder logs", async () => {
    const {
      findByText,
      getByPlaceholderText,
      getAllByText,
      getByText,
      findByTestId,
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
    await waitFor(() => getByText("TestGarden123"));

    // navigates to beds screen
    const newGarden = await findByText("TestGarden123");
    fireEvent.press(newGarden);

    // creates new bed
    const addBedBtn = await findByText(/add bed/i);
    fireEvent.press(addBedBtn);
    const bedNameField = getByPlaceholderText(/new bed name/i);
    fireEvent.changeText(bedNameField, "TestBed123");
    const createBedDoneBtn = getAllByText(/done/i)[0];
    fireEvent.press(createBedDoneBtn);
    const newBed = await waitFor(() => getByText("TestBed123"));

    // navigates to bed
    fireEvent.press(newBed);

    // adds new veggie
    const newVeggieBtn = await findByText(/add veggie/i);
    fireEvent.press(newVeggieBtn);
    const eggplantAddBtn = getByTestId(/eggplant-add-btn/i);
    fireEvent.press(eggplantAddBtn);
    const eggplant = getByText(/^eggplant$/i);
    expect(eggplant).toBeDefined();

    // navigates to new eggplant
    fireEvent.press(eggplant);

    //TODO adds log

    //TODO changes notes

    //TODO changes date

    //TODO reorders logs

    //TODO updates log notes

    //TODO deletes log
  });
});
