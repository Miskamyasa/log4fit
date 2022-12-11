import {memo, ReactElement, ReactNode, useCallback} from "react";
import {StyleSheet, View, ViewStyle} from "react-native";

import layout from "../layout/constants";
import {Approach} from "../store/approaches/types";

import Div from "./Div";
import Span from "./Span";


type _Props = Approach & {
  counter: number,
  flex?: boolean,
};

const container: ViewStyle = {
  height: 42,
  // screenWidth - 2 side paddings in list - 36pt icon width - 1/2 icon margin
  width: layout.width - (layout.gap * 3) - 32,
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: layout.gap,
  marginBottom: layout.gap / 2,
  borderRadius: 4,
  overflow: "hidden",
};

const fullWidth: ViewStyle = {
  ...container,
  width: "100%",
};

const itemStyle: ViewStyle = {
  alignItems: "center",
  paddingRight: layout.gap / 2,
};

const staticStyles = StyleSheet.create({container, fullWidth, itemStyle});

function ApproachCard({counter, repeats, weight, flex = false}: _Props): ReactElement {
  const Wrapper = useCallback((width: string, children: ReactNode) => (
    <View style={{...staticStyles.itemStyle, width}}>
      {children}
    </View>
  ), []);

  return (
    <Div style={flex ? staticStyles.fullWidth : staticStyles.container}>
      {Wrapper("15%", counter > 1 ? (
        <Span
          size={20}
          weight={"900"}>
          {counter}
        </Span>
      ) : null)}
      {Wrapper("15%", counter > 1 ? (
        <Span
          size={17}
          weight={"900"}>
          &times;
        </Span>
      ) : null)}
      {Wrapper("15%", (
        <Span
          size={20}
          weight={"900"}>
          {repeats}
        </Span>
      ))}
      {Wrapper("15%", (
        <Span
          size={17}
          weight={"900"}>
          &times;
        </Span>
      ))}
      {Wrapper("20%", (
        <Span
          size={20}
          weight={"900"}>
          {weight}
        </Span>
      ))}

    </Div>
  );
}

export default memo(ApproachCard);
