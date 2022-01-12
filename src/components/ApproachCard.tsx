import {memo, ReactElement, useCallback} from "react";
import {Image, ImageStyle, StyleSheet, TextStyle, View, ViewStyle} from "react-native";

import layout from "../layout/constants";
import {Approach} from "../store/approaches/types";
import Div from "./Div";
import Span from "./Span";


type _Props = Approach & {
  counter: number,
  readonly flex?: boolean,
};

const container: ViewStyle = {
  height: 36,
  // screenWidth - 2 side paddings in list - 36pt icon width - 1/2 icon margin
  width: layout.width - (layout.gap * 2.5) - 36,
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: layout.gap,
  marginBottom: layout.gap / 2,
};

const fullWidth: ViewStyle = {
  ...container,
  width: "100%",
};

const itemStyle: ViewStyle = {
  alignItems: "flex-end",
  paddingRight: layout.gap,
};

const textStyle: TextStyle = {
  fontSize: 20,
  fontWeight: "900",
};

const warmup: ImageStyle = {
  width: 26,
  height: 26,
};

const staticStyles = StyleSheet.create({container, fullWidth, itemStyle, textStyle, warmup});

function ApproachCard({warmup, counter, repeats, weight, flex = false}: _Props): ReactElement {
  const Wrapper = useCallback((width, children) => (
    <View style={{...staticStyles.itemStyle, width}}>
      {children}
    </View>
  ), []);

  return (
    <Div style={flex ? staticStyles.fullWidth : staticStyles.container}>
      {Wrapper("18%", warmup ? (
        <Image
          style={staticStyles.warmup}
          source={require("../../assets/images/warmup.png")} />
      ) : null)}
      {Wrapper("18%", counter > 1 ? (
        <Span style={staticStyles.textStyle}>{counter} X </Span>
      ) : null)}
      {Wrapper("20%", (
        <Span style={staticStyles.textStyle}>{repeats}</Span>
      ))}
      {Wrapper("20%", (
        <Span style={staticStyles.textStyle}>X</Span>
      ))}
      {Wrapper("24%", (
        <Span style={staticStyles.textStyle}>{weight}</Span>
      ))}
    </Div>
  );
}

export default memo(ApproachCard);
