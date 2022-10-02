import {ReactElement, ReactNode} from "react";
import {StyleSheet, View, ViewStyle} from "react-native";

import layout from "../layout/constants";


type _Props = {
  readonly children: ReactNode,
};

const container: ViewStyle = {
  width: layout.width,
};

const staticStyles = StyleSheet.create({container});

function PageWrapper({children}: _Props): ReactElement {
  return (
    <View style={staticStyles.container}>
      {children}
    </View>
  );
}

export default PageWrapper;
