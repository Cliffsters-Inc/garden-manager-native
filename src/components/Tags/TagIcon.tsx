import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { View } from "../Themed";

export type TagIcon = {
  id: string;
  name: string;
  icon: any;
};

type Props = {
  iconColor: string | undefined;
  selectedIcon: string | undefined;
};

export const TagIconElement = ({ iconColor, selectedIcon }: Props) => {
  const iconList: TagIcon[] = [
    {
      id: "pest",
      name: "pest",
      icon: <Ionicons name="ios-bug-outline" size={20} color={iconColor} />,
    },
    {
      id: "disease",
      name: "disease",
      icon: <FontAwesome5 name="virus" size={20} color={iconColor} />,
    },
    {
      id: "seed",
      name: "seed",
      icon: (
        <MaterialCommunityIcons
          name="seed-outline"
          size={20}
          color={iconColor}
        />
      ),
    },
    {
      id: "seedling",
      name: "seedling",
      icon: <FontAwesome5 name="seedling" size={20} color={iconColor} />,
    },
    {
      id: "default",
      name: "default",
      icon: <FontAwesome name="circle-o" size={20} color="black" />,
    },
  ];

  const Icon = iconList.find((icon) => icon.name === selectedIcon);

  return <View>{Icon?.icon}</View>;
};
