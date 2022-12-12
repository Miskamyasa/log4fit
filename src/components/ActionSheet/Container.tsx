import {ReactElement, ReactNode, useEffect, useMemo, useState} from "react";
import {Animated, StyleSheet, ViewStyle} from "react-native";

import {ThemeProps, useThemeColor} from "../../colors";
import useKeyboard from "../../hooks/useKeyboard";
import layout from "../../layout/constants";


type _Props = {
  children: ReactNode,
};

const container: ViewStyle = {
  borderRadius: layout.gap,
  overflow: "hidden",
  width: layout.width - (layout.gap),
  paddingVertical: layout.gap * 2,
  paddingHorizontal: layout.gap * 2,
};

const staticStyles = StyleSheet.create({
  container,
});

export const colors: ThemeProps = {
  light: "#eaedf1",
  dark: "#1D2125",
};

const gap = (layout.iphoneX ? layout.xSafe : layout.gap * 2);

function Container({children}: _Props): ReactElement {
  const backgroundColor = useThemeColor("viewBackground", colors);

  const styles = useMemo(() => {
    return StyleSheet.compose(staticStyles.container, {backgroundColor});
  }, [backgroundColor]);

  const [keyboardVisible] = useKeyboard();
  const [translateY] = useState(new Animated.Value(gap / 2));

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: !keyboardVisible ? - gap : gap / 2,
      duration: 133,
      delay: 0,
      useNativeDriver: true,
    }).start();
  }, [translateY, keyboardVisible]);

  return (
    <Animated.View style={[styles, {transform: [{translateY}]}]}>
      {children}
    </Animated.View>
  );
}

export default Container;
