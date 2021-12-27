import {Dimensions, Platform} from "react-native";


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const gap = 8;

export default {
  width,
  height,
  gap,
  listItemWidth: width - (gap * 2),
  isSmallDevice: width < 375,
  iphoneX: Platform.OS === "ios" && ((width * 16) / (height * 9) < 0.99),
  xSafe: 28,
};
