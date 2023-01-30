import {StyleSheet} from "react-native"

import layout from "./layout"


export const flatList = StyleSheet.create({
  root: {
    paddingTop: layout.iphoneX ? layout.xSafe : layout.gap,
    paddingHorizontal: layout.gap / 2,
  },
  contentContainer: {
    paddingBottom: layout.statusBarHeight,
  },
})
