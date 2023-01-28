import {memo, ReactElement, useCallback, useMemo} from "react"
import {
  View, Text, StyleSheet, Platform, ViewStyle, TextStyle, TouchableOpacity, Insets,
} from "react-native"

import {MaterialIcons} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"

import {useThemeColor} from "../colors/useThemeColor"
import layout from "../constants/layout"
import {HomeStackNavigationProp} from "../navigation/types"


export type IconNames =
  | "arrow-back-ios"
  | "arrow-back"
  | "settings"
  | "info-outline"


export type HeaderIconProps = {
  iconName: IconNames,
  onPress?: () => void,
}

type _Props = {
  title: string,
  leftIcon?: HeaderIconProps,
  rightIcon?: HeaderIconProps,
}

const iconSize = 24
const headerHeight = 36

const container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  height: headerHeight,
  maxHeight: headerHeight,
}

const title: TextStyle = {
  fontSize: Platform.select({ios: 16, default: 14}),
}

const titleWrapper: ViewStyle = {
  flex: 1,
  marginHorizontal: layout.gap,
  alignItems: Platform.select({
    ios: "center",
    default: "flex-start",
  }),
}

const sideComponent: ViewStyle = {
  width: iconSize + 2,
  height: iconSize + 2,
  marginHorizontal: layout.gap,
}

const staticStyles = StyleSheet.create({
  container,
  title,
  titleWrapper,
  sideComponent,
})

const backIcon = Platform.select<IconNames>({ios: "arrow-back-ios", default: "arrow-back"})

const hitSlop: Insets = layout.hitSlop

function Header({title, leftIcon, rightIcon}: _Props): ReactElement {
  const backgroundColor = useThemeColor("headerBackground")
  const titleColor = useThemeColor("headerTitle")

  const navigation = useNavigation<HomeStackNavigationProp>()

  const styles = useMemo(() => {
    return {
      container: [staticStyles.container, {backgroundColor}],
      title: [staticStyles.title, {color: titleColor}],
    }
  }, [backgroundColor, titleColor])

  const renderSide = useCallback(({iconName, onPress}: HeaderIconProps): ReactElement => (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={hitSlop}>
      <MaterialIcons
        name={iconName}
        size={iconSize}
        color={titleColor} />
    </TouchableOpacity>
  ), [titleColor])

  const leftComponent = useMemo((): null | ReactElement => {
    if (navigation.canGoBack()) {
      return (
        <View style={staticStyles.sideComponent}>
          {renderSide({iconName: backIcon, onPress: (): void => navigation.goBack()})}
        </View>
      )
    }
    if (leftIcon) {
      return (
        <View style={staticStyles.sideComponent}>
          {renderSide(leftIcon)}
        </View>
      )
    }
    if (Platform.OS === "ios") {
      return (
        <View style={staticStyles.sideComponent} />
      )
    }
    return null
  }, [navigation, renderSide, leftIcon])

  return (
    <View style={styles.container}>

      {leftComponent}

      <View style={staticStyles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={staticStyles.sideComponent}>
        {rightIcon ? renderSide(rightIcon) : null}
      </View>

    </View>
  )
}

export default memo(Header)
