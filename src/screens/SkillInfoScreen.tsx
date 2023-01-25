import {ReactElement, useMemo} from "react"

import {Image, ImageStyle, ScrollView, StyleSheet, View, ViewStyle} from "react-native"

import {ThemeProps} from "../colors/types"
import {useThemeColor} from "../colors/useThemeColor"
import Header from "../components/Header"
import Screen from "../components/Screen"
import Span from "../components/Span"
import {__locale} from "../i18"
import layout from "../layout/constants"
import {HomeStackScreenProps} from "../navigation/types"
import {useAppSelector} from "../store"


const colors: ThemeProps = {
  light: "#fefefe",
  dark: "rgba(14, 16, 18, 0.82)",
}

const container: ViewStyle = {
  padding: layout.gap,
}

const image: ImageStyle = {
  width: "100%",
  resizeMode: "center",
  minHeight: layout.height / 4,
  borderRadius: 15,
  overflow: "hidden",
  backgroundColor: "#e1e3e5",
}

const content: ViewStyle = {
  minHeight: layout.height / 5,
  borderRadius: 15,
  overflow: "hidden",
  marginTop: layout.gap,
}

const paddings: ViewStyle = {
  padding: layout.gap * 1.4,
}

const staticStyles = StyleSheet.create({
  container,
  image,
  content,
  paddings,
})

function SkillInfoScreen({route}: HomeStackScreenProps<"SkillInfoScreen">): ReactElement {
  const exercise = useAppSelector(state => state.skills.store[route.params?.id])

  const locale = __locale()

  const backgroundColor = useThemeColor("viewBackground", colors)
  const contentStyle = useMemo(() => {
    return [staticStyles.content, {backgroundColor}]
  }, [backgroundColor])

  return (
    <Screen>
      <Header title={exercise.title[locale]} />

      <ScrollView contentContainerStyle={staticStyles.container}>

        {exercise.image ? (
          <Image
            style={staticStyles.image}
            source={{uri: exercise.image}} />
        ) : null}

        <View style={contentStyle}>
          <View style={staticStyles.paddings}>
            <Span size={16}>
              {exercise.description[locale]}
            </Span>
          </View>
        </View>

      </ScrollView>

    </Screen>
  )
}

export default SkillInfoScreen
