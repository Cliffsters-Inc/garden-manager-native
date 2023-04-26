import { Tag } from "../../features/entity.types";

export const DefaultTagsList: string[] = [
  "pests",
  "disease",
  "sowed",
  "seedling",
  "default",
];

export const convertToTag = (tagName: string) => {
  switch (tagName) {
    case "pests":
      return {
        tagLabel: tagName,
        tagColor: "#FF5A33",
        tagIcon: "pest",
      };
    case "disease":
      return {
        tagLabel: tagName,
        tagColor: "#633c15",
        tagIcon: "disease",
      };
    case "sowed":
      return {
        tagLabel: tagName,
        tagColor: "#B4CF66",
        tagIcon: "seed",
      };
    case "seedling":
      return {
        tagLabel: tagName,
        tagColor: "#44803F",
        tagIcon: "seedling",
      };
    case "default":
      return {
        tagLabel: "default",
        tagColor: "#FFFFFF",
        tagIcon: "default",
      };
    default:
      return {
        tagLabel: "default",
        tagColor: "#FFFFFF",
        tagIcon: "default",
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
  array.find((tag, i) => {
    index = i;
    return tag.tagLabel === tagToRemove;
  });

  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
};
