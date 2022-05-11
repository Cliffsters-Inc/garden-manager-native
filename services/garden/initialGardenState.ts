import { Garden, GardenNormalisedState } from "../types";

export const initialGardenState: Garden[] = [
  {
    name: "frontyard",
    id: "klj39sadg7sd98",
    beds: [
      {
        name: "1",
        id: "23kl4hj23645hj",
        veggies: [
          {
            veggieInfo: { id: "32089ghv290123asg3b21309" },
            id: "3p9314y3hfo3i1nv1320n123f",
            sowDate: "2022-03-16T07:59:10.647Z",
            harvestDate: "2023-01-14T13:00:00.000Z",
            notes:
              "Left half sowed tightly while right half is more spread out.",
            logs: [
              {
                id: "zv8RCeafO_9OFQEL_DRcC",
                date: 1652054400000,
                notes: "starting to sprout\n\nyey",
              },
              {
                id: "utbyJ4pwA1F0TlRcMYYLw",
                date: 1652251484254,
                notes: "bugs everywhere what do?",
              },
            ],
          },
        ],
      },
      {
        name: "2",
        id: "2hjk3afv89",
        veggies: [
          {
            veggieInfo: { id: "32089ghv2ags90aosjdsalkb21309" },
            id: "hi34fp78934ch21398op",
            sowDate: "2022-03-16T07:59:10.647Z",
            harvestDate: "2023-01-14T13:00:00.000Z",
            notes: "Feed these within a week.",
            logs: [],
          },
        ],
      },
    ],
  },
  {
    name: "backyard",
    id: "213nkjun4safgkkhg1",
    beds: [
      {
        name: "1",
        id: "bkghefuhefku865766",
        veggies: [
          {
            veggieInfo: { id: "89ghvsg2ags90aosjdsalkb21309" },
            id: "paosgypaosighpaiosghjk3n3u9i23",
            sowDate: "2022-03-16T07:59:10.647Z",
            harvestDate: "2023-01-14T13:00:00.000Z",
            notes: "Set up shadecloth for extra protection.",
            logs: [],
          },
        ],
      },
    ],
  },
];

export const initialGardenStateNormalised: GardenNormalisedState = {
  gardens: {
    byId: {
      klj39sadg7sd98: {
        name: "frontyard",
        id: "klj39sadg7sd98",
        beds: ["23kl4hj23645hj", "2hjk3afv89"],
      },
      "213nkjun4safgkkhg1": {
        name: "backyard",
        id: "213nkjun4safgkkhg1",
        beds: ["bkghefuhefku865766"],
      },
    },
    allIds: ["klj39sadg7sd98", "213nkjun4safgkkhg1"],
  },
  beds: {
    byId: {
      "23kl4hj23645hj": {
        garden: "klj39sadg7sd98",
        name: "1",
        id: "23kl4hj23645hj",
        veggies: ["3p9314y3hfo3i1nv1320n123f"],
      },
      "2hjk3afv89": {
        garden: "klj39sadg7sd98",
        name: "2",
        id: "2hjk3afv89",
        veggies: ["hi34fp78934ch21398op"],
      },
      bkghefuhefku865766: {
        garden: "213nkjun4safgkkhg1",
        name: "1",
        id: "bkghefuhefku865766",
        veggies: ["paosgypaosighpaiosghjk3n3u9i23"],
      },
    },
    allIds: ["23kl4hj23645hj", "2hjk3afv89", "bkghefuhefku865766"],
  },
  veggies: {
    byId: {
      "3p9314y3hfo3i1nv1320n123f": {
        bed: "23kl4hj23645hj",
        logs: ["zv8RCeafO_9OFQEL_DRcC", "utbyJ4pwA1F0TlRcMYYLw"],
        veggieInfo: { id: "32089ghv290123asg3b21309" },
        id: "3p9314y3hfo3i1nv1320n123f",
        sowDate: "2022-03-16T07:59:10.647Z",
        harvestDate: "2023-01-14T13:00:00.000Z",
        notes: "Left half sowed tightly while right half is more spread out.",
      },
      hi34fp78934ch21398op: {
        bed: "23kl4hj23645hj",
        logs: [],
        veggieInfo: { id: "32089ghv2ags90aosjdsalkb21309" },
        id: "hi34fp78934ch21398op",
        sowDate: "2022-03-16T07:59:10.647Z",
        harvestDate: "2023-01-14T13:00:00.000Z",
        notes: "Feed these within a week.",
      },
      paosgypaosighpaiosghjk3n3u9i23: {
        bed: "bkghefuhefku865766",
        logs: [],
        veggieInfo: { id: "89ghvsg2ags90aosjdsalkb21309" },
        id: "paosgypaosighpaiosghjk3n3u9i23",
        sowDate: "2022-03-16T07:59:10.647Z",
        harvestDate: "2023-01-14T13:00:00.000Z",
        notes: "Set up shadecloth for extra protection.",
      },
    },
    allIds: [
      "3p9314y3hfo3i1nv1320n123f",
      "hi34fp78934ch21398op",
      "paosgypaosighpaiosghjk3n3u9i23",
    ],
  },
  veggieLogs: {
    byId: {
      zv8RCeafO_9OFQEL_DRcC: {
        veggie: "3p9314y3hfo3i1nv1320n123f",
        id: "zv8RCeafO_9OFQEL_DRcC",
        date: 1652054400000,
        notes: "starting to sprout\n\nyey",
      },
      utbyJ4pwA1F0TlRcMYYLw: {
        veggie: "3p9314y3hfo3i1nv1320n123f",
        id: "utbyJ4pwA1F0TlRcMYYLw",
        date: 1652251484254,
        notes: "bugs everywhere what do?",
      },
    },
    allIds: ["zv8RCeafO_9OFQEL_DRcC", "utbyJ4pwA1F0TlRcMYYLw"],
  },
};
