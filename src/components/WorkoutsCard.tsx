import {ReactElement, ReactNode} from "react";
import {StyleSheet, View, ViewStyle} from "react-native";


type Props = {readonly children: ReactNode};

const container: ViewStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.3)",
};

const staticStyles = StyleSheet.create({
  container,
});

function WorkoutsCard({children}: Props): ReactElement {
  return (
    <View style={staticStyles.container}>
      {children}
    </View>
  );
}

export default WorkoutsCard;
