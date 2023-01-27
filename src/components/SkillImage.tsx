import {ReactElement, useMemo} from "react"
import {ImageRequireSource, StyleProp} from "react-native"

import FastImage, {ImageStyle, Source} from "react-native-fast-image"

import customIcon from "../../assets/images/custom.png"


type _Props = {
  style?: StyleProp<ImageStyle>,
  uri: string,
}

export default function SkillImage({style, uri}: _Props): ReactElement {
  const source = useMemo((): Source | ImageRequireSource => {
    if (uri) {
      return {uri}
    }
    return customIcon as ImageRequireSource
  }, [uri])

  return (
    <FastImage
      style={style}
      source={source}
      resizeMode={FastImage.resizeMode.contain} />
  )
}
