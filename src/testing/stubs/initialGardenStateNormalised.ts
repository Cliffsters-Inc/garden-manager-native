import { GardenNormalisedState } from "../../features/utils/getInitialNormalisedGardenData";

export const initialGardenStateNormalised: GardenNormalisedState = {
  gardens: {
    klj39sadg7sd98: {
      name: "frontyard",
      id: "klj39sadg7sd98",
      beds: ["kl4hj23645hj", "hjk3afv89"],
    },
    nkjun4safgkkhg1: {
      name: "backyard",
      id: "nkjun4safgkkhg1",
      beds: ["bkghefuhefku865766"],
    },
    nfsdgsagahgerf: {
      name: "Green House",
      id: "nfsdgsagahgerf",
      beds: [],
    },
  },
  beds: {
    kl4hj23645hj: {
      garden: "klj39sadg7sd98",
      name: "1",
      id: "kl4hj23645hj",
      veggies: ["p9314y3hfo3i1nv1320n123f"],
    },
    hjk3afv89: {
      garden: "klj39sadg7sd98",
      name: "2",
      id: "hjk3afv89",
      veggies: ["hi34fp78934ch21398op"],
    },
    bkghefuhefku865766: {
      garden: "nkjun4safgkkhg1",
      name: "1",
      id: "bkghefuhefku865766",
      veggies: ["paosgypaosighpaiosghjk3n3u9i23"],
    },
  },
  veggies: {
    p9314y3hfo3i1nv1320n123f: {
      bed: "kl4hj23645hj",
      logs: ["zv8RCeafO9OFQELDRcC", "utbyJ4pwA1F0TlRcMYYLw"],
      veggieInfo: { id: "ghv290123asg3b21309" },
      id: "p9314y3hfo3i1nv1320n123f",
      notes: "Left half sowed tightly while right half is more spread out.",
    },
    hi34fp78934ch21398op: {
      bed: "hjk3afv89",
      logs: [],
      veggieInfo: { id: "ghv2ags90aosjdsalkb21309" },
      id: "hi34fp78934ch21398op",
      notes: "Feed these within a week.",
    },
    paosgypaosighpaiosghjk3n3u9i23: {
      bed: "bkghefuhefku865766",
      logs: [],
      veggieInfo: { id: "ghvsg2ags90aosjdsalkb21309" },
      id: "paosgypaosighpaiosghjk3n3u9i23",
      notes: "Set up shadecloth for extra protection.",
    },
  },
  logs: {
    zv8RCeafO9OFQELDRcC: {
      veggie: "p9314y3hfo3i1nv1320n123f",
      id: "zv8RCeafO9OFQELDRcC",
      date: 1652054400000,
      location: { gardenTitle: "frontyard", bedTitle: "1" },
      notes: "starting to sprout\n\nyey",
      photos: { entities: [], loading: "pending" },
      payloadTags: [
        { tagLabel: "pests", tagColor: "#FF5A33", tagIcon: "pest" },
      ],
    },
    utbyJ4pwA1F0TlRcMYYLw: {
      veggie: "p9314y3hfo3i1nv1320n123f",
      id: "utbyJ4pwA1F0TlRcMYYLw",
      date: 1652251484254,
      location: { gardenTitle: "frontyard", bedTitle: "1" },
      notes: "bugs everywhere what do?",
      photos: { entities: [], loading: "pending" },
      payloadTags: [
        { tagLabel: "pests", tagColor: "#FF5A33", tagIcon: "pest" },
      ],
    },
  },
};
