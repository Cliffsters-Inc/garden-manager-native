import { nanoid } from "@reduxjs/toolkit";
import { Garden } from "../services/types";

export const testGardenState: Garden[] = [
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
            notes:
              "Left half sowed tightly while right half is more spread out.",
            logs: [
              {
                id: nanoid(),
                date: 1654910862301,
                notes:
                  "Sunt nisi dolore ex quis consectetur ullamco culpa excepteur ea officia laborum esse laborum labore.",
                payloadTags: [
                  { tagLabel: "pests", tagColor: "#FF5A33", tagIcon: "pest" },
                ],
              },
              {
                id: nanoid(),
                date: 1654910000000,
                notes:
                  "Reprehenderit consectetur anim laboris elit fugiat veniam proident aliqua esse. Sunt nisi dolore ex quis consectetur ullamco culpa excepteur ea officia laborum esse laborum labore. Pariatur fugiat tempor anim sunt pariatur. Ea ea labore in reprehenderit et amet. Id nulla voluptate in incididunt voluptate ut aliqua ex ut mollit reprehenderit magna. Magna consectetur irure laborum id qui aute ullamco incididunt. Elit officia ut pariatur minim.",
                payloadTags: [
                  {
                    tagLabel: "disease",
                    tagColor: "#633c15",
                    tagIcon: "disease",
                  },
                ],
              },
              {
                id: nanoid(),
                date: 1655010000000,
                notes:
                  "Pariatur mollit voluptate deserunt nisi reprehenderit consectetur anim laboris elit fugiat veniam proident aliqua esse.",
                payloadTags: [
                  {
                    tagLabel: "sowed",
                    tagColor: "#B4CF66",
                    tagIcon: "seed",
                  },
                ],
              },
              {
                id: nanoid(),
                date: 165310000000,
                notes:
                  "Pariatur mollit voluptate deserunt nisi reprehenderit consectetur anim laboris elit fugiat veniam proident aliqua esse.",
                payloadTags: [
                  {
                    tagLabel: "seedling",
                    tagColor: "#44803F",
                    tagIcon: "seedling",
                  },
                ],
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
            notes: "Set up shadecloth for extra protection.",
            logs: [],
          },
        ],
      },
    ],
  },
];
