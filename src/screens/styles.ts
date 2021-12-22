import {StyleSheet, ViewStyle} from "react-native";

const container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
};

export const notFoundScreenStyles = StyleSheet.create({
  container,
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export const welcomeScreenStyles = StyleSheet.create({
  container,
});
