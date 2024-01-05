import {Dimensions, Platform, StatusBar} from "react-native"


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const gap = 10
const hitInset = 10

const iconWidth = 40

const skillTitleWidth = 100

const iphoneX = Platform.OS === "ios" && ((width * 16) / (height * 9) < 0.99)

const layout = {
    width,
    height,
    gap,
    iconWidth,
    skillTitleWidth,
    statusBarHeight: Platform.select({
        android: StatusBar.currentHeight,
        ios: iphoneX ? 48 : 20,
    }),
    isSmallDevice: width < 375,
    iphoneX,
    xSafe: 36,
    hitSlop: {top: hitInset, bottom: hitInset, left: hitInset, right: hitInset},
}

export default layout
