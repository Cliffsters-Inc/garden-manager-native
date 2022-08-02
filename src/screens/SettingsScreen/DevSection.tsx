import React from "react";
import { Button } from "react-native";

import { Text, View } from "../../components/Themed";
import { clearDeviceStorage } from "./utils/clearDeviceStorage";

export const DevSection = () => {
  const isDevEnvironment = process.env.NODE_ENV === "development";

  return isDevEnvironment ? (
    <View
      style={{
        position: "absolute",
        bottom: 20,
        left: 20,
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "dashed",
        padding: 5,
      }}
    >
      <Text style={{ color: "red" }}>* Dev environment only section *</Text>
      <Text>
        Clear device storage:
        <Button title="Clear" onPress={() => clearDeviceStorage()} />
      </Text>
    </View>
  ) : null;
};
