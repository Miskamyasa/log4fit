import {memo, ReactElement, useCallback} from "react";
import {StyleSheet, TextStyle, View, ViewStyle} from "react-native";

import Span from "../../components/Span";
import layout from "../../layout/constants";
import {Approach} from "../../store/approaches/types";


type Props = Approach & {counter: number};

const container: ViewStyle = {
  height: "100%",
  // screenWidth - 2 side paddings in list - 36pt icon width - 1/2 icon margin
  width: layout.width - (layout.gap * 1.5) - 36,
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: layout.gap,
};

const itemStyle: ViewStyle = {
  alignItems: "flex-end",
};

const textStyle: TextStyle = {
  flex: 0,
  fontSize: 20,
  fontWeight: "900",
};

const staticStyles = StyleSheet.create({container, itemStyle, textStyle});

function WorkoutsApproach({warmup, counter, repeats, weight}: Props): ReactElement {
  const Wrapper = useCallback((width, children) => (
    <View style={{...staticStyles.itemStyle, width}}>
      {children}
    </View>
  ), []);

  return (
    <View style={staticStyles.container}>
      {Wrapper("18%", warmup ? (
        <Span style={staticStyles.textStyle}>w</Span>
      ) : null)}
      {Wrapper("18%", counter > 1 ? (
        <Span style={staticStyles.textStyle}>{String(counter)} X </Span>
      ) : null)}
      {Wrapper("20%", (
        <Span style={staticStyles.textStyle}>{String(repeats)}</Span>
      ))}
      {Wrapper("20%", (
        <Span style={staticStyles.textStyle}>X</Span>
      ))}
      {Wrapper("24%", (
        <Span style={staticStyles.textStyle}>{String(weight)}</Span>
      ))}
    </View>
  );
}

export default memo(WorkoutsApproach);
