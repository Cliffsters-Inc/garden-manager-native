import { createContext } from "react";
import { Tag } from "./types";

interface AppContextInterface {
  pressedTags: Tag[];
  setPressedTags: React.Dispatch<Tag[]>;
}
export const pressedTagsContext = createContext<AppContextInterface | null>(
  null
);
