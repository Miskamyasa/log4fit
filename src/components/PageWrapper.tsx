import {ReactElement, ReactNode} from "react";
import {StyleSheet, ViewStyle} from "react-native";

import layout from "../layout/constants";
import Div from "./Div";


type _Props = {
  readonly children: ReactNode,
};

const container: ViewStyle = {
  width: layout.width,
};

const staticStyles = StyleSheet.create({container});

function PageWrapper({children}: _Props): ReactElement {
  return (
    <Div style={staticStyles.container}>
      {children}
    </Div>
  );
}

export default PageWrapper;
