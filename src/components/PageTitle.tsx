import {ReactElement} from "react";
import {StyleSheet, TextStyle, ViewStyle} from "react-native";

import layout from "../layout/constants";

import Div from "./Div";
import Span from "./Span";


type _Props = {
  title: string,
};

const container: ViewStyle = {
  height: 36,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: layout.gap / 2,
  overflow: "hidden",
};

const text: TextStyle = {
  fontSize: 15,
};

const staticStyles = StyleSheet.create({container, text});

function PageTitle({title}: _Props): ReactElement {
  return (
    <Div style={staticStyles.container}>
      <Span style={staticStyles.text}>{title}</Span>
    </Div>
  );
}

export default PageTitle;
