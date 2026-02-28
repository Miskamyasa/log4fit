import {memo, type ReactElement, useCallback, useMemo} from "react"
import {
  View, Text, Platform, TouchableOpacity, type Insets,
} from "react-native"

import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import {useNavigation} from "@react-navigation/native"

import {useThemeColor} from "../colors/useThemeColor"
import {layout} from "../constants/layout"
import {createStaticStyles} from "../helpers/createStaticStyles"
import type {HomeStackNavigationProp} from "../navigation/types"

export type IconNames
    = | "arrow-back-ios"
    | "arrow-back"
    | "settings"
    | "info-outline"
    | "bar-chart"

export type HeaderIconProps = {
  iconName: IconNames,
  onPress?: () => void,
}

const iconSize = 24

const staticStyles = createStaticStyles({
  container: {
    alignItems: "center",
    flexDirection: "row",
    height: layout.headerHeight,
    justifyContent: "space-between",
    maxHeight: layout.headerHeight,
  },
  sideComponent: {
    height: iconSize + 2,
    marginHorizontal: layout.gap,
    width: iconSize + 2,
  },
  title: {
    fontSize: Platform.select({ios: 16, default: 14}),
  },
  titleWrapper: {
    alignItems: Platform.select({
      ios: "center",
      default: "flex-start",
    }),
    flex: 1,
    marginHorizontal: layout.gap,
  },
})

const backIcon = Platform.select<IconNames>({ios: "arrow-back-ios", default: "arrow-back"})

const hitSlop: Insets = layout.hitSlop

export const Header = memo(function Header(props: {
  title: string,
  leftIcon?: HeaderIconProps,
  rightIcon?: HeaderIconProps,
}) {
  const {title, leftIcon, rightIcon} = props

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
      hitSlop={hitSlop}
      onPress={onPress}>
      <MaterialIcons
        color={titleColor}
        name={iconName}
        size={iconSize} />
    </TouchableOpacity>
  ), [titleColor])

  const leftComponent = useMemo((): null | ReactElement => {
    if (navigation.canGoBack()) {
      return (
        <View style={staticStyles.sideComponent}>
          {renderSide({iconName: backIcon, onPress: (): void => {navigation.goBack()}})}
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
})
