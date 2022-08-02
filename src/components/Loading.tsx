import React from "react";
import { View, Text } from "./Themed";

export const Loading = ({ text = "Loading..." }) => (
  <View>
    <Text>{text}</Text>
  </View>
);
