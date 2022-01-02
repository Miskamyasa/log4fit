import {Dimensions, Platform} from "react-native";


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const gap = 10;

const layout ={
  width,
  height,
  gap,
  isSmallDevice: width < 375,
  iphoneX: Platform.OS === "ios" && ((width * 16) / (height * 9) < 0.99),
  xSafe: 30,
};

export default layout;
