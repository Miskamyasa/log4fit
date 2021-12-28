import {Dimensions, Platform, ViewStyle} from "react-native";


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const gap = 8;
const listItemWidth = width - (gap * 2);

const listContentItem: ViewStyle = {
  overflow: "hidden",
  alignSelf: "center",
  width: listItemWidth,
};

const layout ={
  width,
  height,
  gap,
  listItemWidth,
  isSmallDevice: width < 375,
  iphoneX: Platform.OS === "ios" && ((width * 16) / (height * 9) < 0.99),
  xSafe: 28,
  listContentItem,
};

export default layout;
