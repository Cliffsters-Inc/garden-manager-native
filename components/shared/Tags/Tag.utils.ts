export const defaultTagsList: string[] = [
  "pests",
  "disease",
  "sowed",
  "seedling",
];

export const convertToTag = (tag: string) => {
  switch (tag) {
    case "pests":
      return {
        tagLabel: tag,
        tagColor: "#FF5A33",
        tagIcon: "pest",
      };
    case "disease":
      return {
        tagLabel: tag,
        tagColor: "#FFEC5C",
        tagIcon: "disease",
      };
    case "sowed":
      return {
        tagLabel: tag,
        tagColor: "#B4CF66",
        tagIcon: "seed",
      };
    case "seedling":
      return {
        tagLabel: tag,
        tagColor: "#44803F",
        tagIcon: "seedling",
      };
  }
};

export const AddTagToList = (arrayName: string[], tagToAdd: string) => {
  const convertedTag = convertToTag(tagToAdd);
  const arrayToSend = [...arrayName, convertedTag];
  // const arrayToSend = [...arrayName, tagToAdd];
  return arrayToSend;
};