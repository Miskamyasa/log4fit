import {Dimensions, Platform} from "react-native"


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const gap = 10
const hitInset = 6

const iphoneX = Platform.OS === "ios" && ((width * 16) / (height * 9) < 0.99)

const layout = {
  width,
  height,
  gap,
  statusBarHeight: Platform.select({
    android: 25,
    ios: iphoneX ? 48 : 20,
  }),
  isSmallDevice: width < 375,
  iphoneX,
  xSafe: 36,
  hitSlop: {top: hitInset, bottom: hitInset, left: hitInset, right: hitInset},
}

export default layout
