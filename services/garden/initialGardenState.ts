import { Garden } from "../types";

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
          },
        ],
      },
    ],
  },
];
