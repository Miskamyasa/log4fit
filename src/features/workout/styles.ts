import {StyleSheet, TextStyle, ViewStyle} from "react-native";

import layout from "../../layout/constants";


const addButtons: ViewStyle = {
  borderRadius: layout.gap,
  overflow: "hidden",
  height: 64,
  justifyContent: "center",
  paddingHorizontal: layout.gap * 2,
  width: (layout.width - (layout.gap * 1.75)) / 2,
};

const text: TextStyle = {
  flex: 0,
  fontSize: 15,
  fontWeight: "600",
};

export const buttonsStyles = StyleSheet.create({
  addButtons,
  text,
});

export const borders: ViewStyle = {
  borderRadius: 6,
  overflow: "hidden",
  borderWidth: 2,
  borderColor: "#aaa",
};

export const inputStyles = StyleSheet.create({
  input: {
    height: 46,
    width: 68,
    // margin: 12,
    paddingVertical: layout.gap,
    paddingHorizontal: layout.gap / 2,
    fontSize: 24,
    fontWeight: "900",
    textAlign: "right",
    ...borders,
  },
});
