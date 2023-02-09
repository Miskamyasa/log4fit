import {ReactElement, useMemo} from "react"
import {StyleSheet, ImageRequireSource} from "react-native"

import FastImage, {Source} from "react-native-fast-image"

import layout from "../constants/layout"
import * as images from "../images"


type ImagesUri = keyof typeof images
type _Props = {
  uri: string,
}

const styles = StyleSheet.create({
  icon: {
    zIndex: 2,
    width: 32,
    height: 32,
    overflow: "hidden",
    borderRadius: 6,
    marginLeft: layout.gap / 2,
    marginRight: layout.gap,
  },
})

export default function SkillImage({uri}: _Props): ReactElement {
  const source = useMemo((): Source | ImageRequireSource => {
    if (uri.includes("http")) {
      return {uri}
    }
    try {
      const image = images[uri as ImagesUri]
      if (image) {
        return image as ImageRequireSource
      }
    } catch (e) {
      // ..
    }
    return images.customIcon
  }, [uri])

  return (
    <FastImage
      style={styles.icon}
      source={source}
      resizeMode={FastImage.resizeMode.contain} />
  )
}
