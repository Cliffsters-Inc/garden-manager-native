import { Tag } from "./../../../services/types";
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
        tagColor: "#633c15",
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
    default:
      return {
        tagLabel: "",
        tagColor: "#FFFFFF",
      };
  }
};

export const AddTagToList = (array: Tag[], tagToAdd: string) => {
  const convertedTag = convertToTag(tagToAdd);
  const arrayToSend = [...array, convertedTag];
  return arrayToSend;
};

export const RemoveTagFromList = (array: Tag[], tagToRemove: string) => {
  let index = 0;
  const toRemove = array.find((tag, i) => {
    index = i;
    return tag.tagLabel === tagToRemove;
  });
  console.log("toRemove ", toRemove);
  console.log("index", index);

  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
};
