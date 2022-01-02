import {memo, ReactElement, ReactNode, useMemo} from "react";
import {StyleSheet, View, ViewStyle} from "react-native";

import {useThemeColor} from "../colors";
import layout from "../layout/constants";


type Props = {
  readonly children: ReactNode,
  readonly unsafe?: boolean,
};

const root: ViewStyle = {
  flex: 1,
  padding: 0,
};

const safeArea: ViewStyle = {
  paddingBottom: layout.iphoneX ? layout.xSafe : 0,
};

const staticStyles = StyleSheet.create({root, safeArea});

function Screen({children, unsafe}: Props): ReactElement {
  const backgroundColor = useThemeColor("screenBackground");

  const style = useMemo(() => {
    const styles = [staticStyles.root, {backgroundColor}];
    if (!unsafe) {
      styles.push(staticStyles.safeArea);
    }
    return StyleSheet.flatten(styles);
  }, [unsafe, backgroundColor]);

  return (
    <View style={style}>
      {children}
    </View>
  );
}

export default memo(Screen);
