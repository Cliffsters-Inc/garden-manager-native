import { useState } from "react";
import { Button } from "react-native-elements";

import { Text, View } from "../../components/Themed";

export const Test = () => {
  const [filteredArray, setFilteredArray] = useState([]);

  const logsArr = [
    {
      id: "zv8RCeafO9OFQELDRcC",
      payloadTags: [
        {
          tagLabel: "seedling",
          tagColor: "#44803F",
          tagIcon: "seedling",
        },
        {
          tagLabel: "op",
          tagColor: "#44803F",
          tagIcon: "op",
        },
      ],
    },
    {
      id: "utbyJ4pwA1F0TlRcMYYLw",
      payloadTags: [
        { tagLabel: "pests", tagColor: "#FF5A33", tagIcon: "pest" },
      ],
    },
    {
      id: "utbyJ4pwA1F0TlRcMYYLw",
      payloadTags: [
        { tagLabel: "disease", tagColor: "#FF5A33", tagIcon: "foo" },
      ],
    },
  ];

  const filterArr = ["pests", "seedling", "disease", "generic"];

  function con() {
    console.log("filtered: ", filteredArray);
    console.log("logsArr: ", logsArr);
  }

  const filter = () => {
    const filteredList = logsArr.filter((tagObj) => {
      const filteredPayloadTags = tagObj.payloadTags.some((payloadTagObj) => {
        return filterArr.includes(payloadTagObj.tagLabel);
      });

      return filteredPayloadTags;
    });
    setFilteredArray(filteredList);
  };
  return (
    <View>
      <Text>TestComp</Text>
      <Button title="filter" onPress={filter} />
      <Button title="con" onPress={con} />
    </View>
  );
};
