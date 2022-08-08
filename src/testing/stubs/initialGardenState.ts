import { Garden } from "../../features/entity.types";

export const initialGardenState: Garden[] = [
  {
    name: "frontyard",
    id: "klj39sadg7sd98",
    beds: [
      {
        name: "1",
        id: "kl4hj23645hj",
        veggies: [
          {
            veggieInfo: { id: "ghv290123asg3b21309" },
            id: "p9314y3hfo3i1nv1320n123f",
            notes:
              "Left half sowed tightly while right half is more spread out.",
            logs: [
              {
                id: "zv8RCeafO9OFQELDRcC",
                date: 1652054400000,
                notes: "starting to sprout\n\nyey",
                photos: { entities: [], loading: "pending" },
                payloadTags: [
                  { tagLabel: "pests", tagColor: "#FF5A33", tagIcon: "pest" },
                ],
              },
              {
                id: "utbyJ4pwA1F0TlRcMYYLw",
                date: 1652251484254,
                notes: "bugs everywhere what do?",
                photos: { entities: [], loading: "pending" },
                payloadTags: [
                  { tagLabel: "pests", tagColor: "#FF5A33", tagIcon: "pest" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "2",
        id: "hjk3afv89",
        veggies: [
          {
            veggieInfo: { id: "ghv2ags90aosjdsalkb21309" },
            id: "hi34fp78934ch21398op",
            notes: "Feed these within a week.",
            logs: [],
          },
        ],
      },
    ],
  },
  {
    name: "backyard",
    id: "nkjun4safgkkhg1",
    beds: [
      {
        name: "1",
        id: "bkghefuhefku865766",
        veggies: [
          {
            veggieInfo: { id: "ghvsg2ags90aosjdsalkb21309" },
            id: "paosgypaosighpaiosghjk3n3u9i23",
            notes: "Set up shadecloth for extra protection.",
            logs: [],
          },
        ],
      },
    ],
  },
  {
    name: "Green House",
    id: "nfsdgsagahgerf",
    beds: [],
  },
];
