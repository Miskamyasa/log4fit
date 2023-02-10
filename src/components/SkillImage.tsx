import {ReactElement, useMemo} from "react"
import {StyleSheet, ImageRequireSource} from "react-native"

import FastImage, {Source} from "react-native-fast-image"

import layout from "../constants/layout"
import * as images from "../images"
import {AvailableImages} from "../images/types"


type _Props = {
  name: string,
}

const styles = StyleSheet.create({
  icon: {
    zIndex: 2,
    width: layout.iconWidth,
    height: layout.iconWidth,
    overflow: "hidden",
    borderRadius: 6,
    marginLeft: layout.gap / 2,
    marginRight: layout.gap,
  },
})

export default function SkillImage({name}: _Props): ReactElement {
  const source = useMemo((): Source | ImageRequireSource => {
    try {
      const image = images[name as AvailableImages]
      if (image) {
        return image as ImageRequireSource
      }
    } catch (e) {
      // ..
    }
    return images.customIcon
  }, [name])

  return (
    <FastImage
      style={styles.icon}
      source={source}
      resizeMode={FastImage.resizeMode.contain} />
  )
}
