import {ReactElement, useMemo} from "react"

import {Image, ImageSourcePropType, ImageStyle} from "react-native"

import customIcon from "../../assets/images/custom.png"


type _Props = {
  style?: ImageStyle,
  uri: string,
}

export default function SkillImage({style, uri}: _Props): ReactElement {
  const source = useMemo((): ImageSourcePropType => {
    if (uri) {
      return {uri}
    }
    return customIcon as ImageSourcePropType
  }, [uri])

  return (
    <Image
      style={style}
      source={source} />
  )
}
