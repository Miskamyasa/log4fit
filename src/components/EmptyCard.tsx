import {memo, ReactElement} from "react";
import {StyleSheet, TextStyle, ViewStyle} from "react-native";

import {__t} from "../i18";
import layout from "../layout/constants";
import Div from "./Div";
import Span from "./Span";


type _Props = {
  readonly text?: string,
};

const card: ViewStyle = {
  borderRadius: layout.gap,
  overflow: "hidden",
  height: 54,
  justifyContent: "center",
  paddingHorizontal: layout.gap * 2,
  marginBottom: layout.gap,
};

const text: TextStyle = {
  flex: 0,
  fontSize: 15,
  fontWeight: "600",
};

const staticStyles = StyleSheet.create({
  card,
  text,
});

function EmptyCard({text = __t("emptyApproaches")}: _Props): ReactElement {
  return (
    <Div style={staticStyles.card}>
      <Span style={staticStyles.text}>{text}</Span>
    </Div>
  );
}

export default memo(EmptyCard);
