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
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  rest?: React.ForwardRefExoticComponent<
    PressableProps & React.RefAttributes<View>
  >;
};

export const ActionButton = ({
  text,
  onPress,
  style,
  textStyle,
  ...rest
}: Props) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]} {...rest}>
      <Text style={[styles.btn, textStyle]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffaa72",
    padding: 15,
    borderRadius: 200,
    position: "absolute",
    bottom: 20,
    right: 20,
    shadowColor: "#ffaa72",
    shadowOpacity: 0.75,
    shadowOffset: { width: 3, height: 3 },
  },
  btn: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
});
