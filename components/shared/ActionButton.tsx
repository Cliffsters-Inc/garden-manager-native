import { ReactNode } from "react";
import {
  Pressable,
  Text,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  PressableProps,
  View,
  StyleSheet,
} from "react-native";

type Props = {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  color?: ViewStyle["backgroundColor"];
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: ReactNode;
  rest?: React.ForwardRefExoticComponent<
    PressableProps & React.RefAttributes<View>
  >;
};

export const ActionButton = ({
  text,
  color = "#ffaa72",
  onPress,
  style,
  textStyle,
  children,
  ...restOfProps
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: color, shadowColor: color },
        style,
      ]}
      {...restOfProps}
    >
      {children ? (
        children
      ) : (
        <Text style={[styles.btn, textStyle]}>{text}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 200,
    position: "absolute",
    bottom: 20,
    right: 20,
    shadowOpacity: 0.75,
    shadowOffset: { width: 3, height: 3 },
  },
  btn: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
});
