import { Feather } from "@expo/vector-icons";
import { TextProps } from "react-native";

export const CrossBtn = (props: TextProps) => (
  <Feather name="x" size={24} color="gray" {...props} />
);
