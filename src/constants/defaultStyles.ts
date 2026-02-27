import {Platform, type ViewStyle} from "react-native"

import {createStaticStyles} from "../helpers/createStaticStyles"

import {layout} from "./layout"

export const flatList = createStaticStyles({
  contentContainer: {
    paddingBottom: layout.statusBarHeight,
  },
  flashList: {
    paddingHorizontal: layout.gap / 2,
    paddingTop: layout.iphoneX ? layout.xSafe : layout.gap,
  },
  root: {
    flex: 1,
    paddingBottom: Platform.OS === "ios" ? 0 : layout.gap,
    paddingHorizontal: layout.gap / 2,
    paddingTop: layout.iphoneX ? layout.xSafe : layout.gap,
  },
})

export const buttons: ViewStyle = {
  borderRadius: layout.gap,
  overflow: "hidden",
  height: 44,
  justifyContent: "center",
  paddingHorizontal: layout.gap * 2,
}
