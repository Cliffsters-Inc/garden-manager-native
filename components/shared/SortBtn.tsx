import { Octicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { PlatformColor } from "react-native";

type Props = { descending?: boolean } & Omit<
  ComponentProps<typeof Octicons>,
  "name"
>;

export const SortBtn = ({ descending, ...rest }: Props) => (
  <Octicons
    name={descending ? "sort-desc" : "sort-asc"}
    size={24}
    color={PlatformColor("linkColor")}
    {...rest}
  />
);
