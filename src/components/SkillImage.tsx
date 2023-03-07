import {ReactElement, useMemo} from "react"
import {ImageRequireSource} from "react-native"

import {Image} from "expo-image"

import layout from "../constants/layout"
import createStaticStyles from "../helpers/createStaticStyles"
import Sentry from "../helpers/Sentry"
import * as images from "../images"


interface Props {
  name: string
}

// noinspection JSSuspiciousNameCombination
const styles = createStaticStyles({
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

export default function SkillImage({name}: Props): ReactElement {
  const source = useMemo(() => {
    try {
      const image = images[name as keyof typeof images]
      if (image) {
        return image as ImageRequireSource
      }
    } catch (e) {
      Sentry.captureException(e)
    }
    return images.customIcon
  }, [name])

  return (
    <Image
      style={styles.icon}
      source={source}
      contentFit="cover" />
  )
}
