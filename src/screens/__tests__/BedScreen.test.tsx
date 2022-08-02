import { fireEvent, renderApp } from "../../testing/test.utils";

describe("<BedTabScreen />", () => {
  it("can add a veggie", async () => {
    const {
      findByText,
      getByPlaceholderText,
      getAllByText,
      getByText,
      getByTestId,
    } = renderApp();

    // creates new garden
    const addGardenBtn = await findByText(/add garden/i);
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

    // adds new veggie
    const newVeggieBtn = getByText(/add veggie/i);
    fireEvent.press(newVeggieBtn);
    const eggplantAddBtn = getByTestId(/eggplant-add-btn/i);
    fireEvent.press(eggplantAddBtn);
    const eggplant = getByText(/^eggplant$/i);
    expect(eggplant).toBeDefined();
  });
});
