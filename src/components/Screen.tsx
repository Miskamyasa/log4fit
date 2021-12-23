import {memo, ReactElement, ReactNode, useMemo} from "react";
import {StyleSheet, ViewStyle} from "react-native";
import {Edge, SafeAreaView} from "react-native-safe-area-context";
import {ThemeProps, useThemeColor} from "../hooks/useThemeColor";


type Props = {children: ReactNode} & ThemeProps;

const root: ViewStyle = {
  flex: 1,
  padding: 20,
};

const styles = StyleSheet.create({root});

const edges: Edge[] = ["right", "bottom", "left"];

function Screen(props: Props): ReactElement {
  const {children, light, dark} = props;
  const backgroundColor = useThemeColor("screenBackground", {light, dark});

  const style = useMemo(() => {
    return StyleSheet.flatten([styles.root, {backgroundColor}]);
  }, [backgroundColor]);

  return (
    <SafeAreaView
      style={style}
      edges={edges}>
      {children}
    </SafeAreaView>
  );
}

export default memo(Screen);
