import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearDeviceStorage = async () => {
  try {
    const allStorage = await AsyncStorage.getAllKeys();
    if (allStorage.length === 0) throw "Device storage already empty";

    await AsyncStorage.clear();
    console.warn("Device storage successfully cleared");
  } catch (err) {
    console.error(err);
  }
};
