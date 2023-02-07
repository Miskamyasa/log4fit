import {ReactElement, useMemo} from "react"
import {ImageRequireSource, StyleProp} from "react-native"

import FastImage, {ImageStyle, Source} from "react-native-fast-image"

import * as images from "../images"


type _Props = {
  style?: StyleProp<ImageStyle>,
  uri: keyof typeof images,
}

export default function SkillImage({style, uri}: _Props): ReactElement {
  const source = useMemo((): Source | ImageRequireSource => {
    if (uri.includes("http")) {
      return {uri}
    }
    const image = images[uri]
    if (image) {
      return image as ImageRequireSource
    }
    return images.customIcon
  }, [uri])

  return (
    <FastImage
      style={style}
      source={source}
      resizeMode={FastImage.resizeMode.contain} />
  )
}
