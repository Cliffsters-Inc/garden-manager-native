import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { View } from "./Themed";

export type Icon = {
  name: string;
  icon: any;
};

type Props = {
  //   iconColor?: string | undefined;
  selectedIcon: any;
};

export const FindIcon = ({ selectedIcon }: Props) => {
  // iconColor = 'red'
  const iconList: Icon[] = [
    {
      name: "pests",
      icon: <Ionicons name="ios-bug-outline" size={20} />,
    },
    {
      name: "disease",
      icon: <FontAwesome5 name="virus" size={20} />,
    },
    {
      name: "seed",
      icon: <MaterialCommunityIcons name="seed-outline" size={20} />,
    },
    {
      name: "seedling",
      icon: <FontAwesome5 name="seedling" size={20} color="black" />,
    },
  ];

  const Icon = iconList.find((icon) => icon.name === selectedIcon);

  return <View>{Icon?.icon}</View>;
};
