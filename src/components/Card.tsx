import {memo, type PropsWithChildren} from "react"
import {type ViewStyle} from "react-native"

import {type ColorNames} from "../colors/types"
import {layout} from "../constants/layout"
import {createStaticStyles} from "../helpers/createStaticStyles"

import {Div} from "./Div"

const staticStyles = createStaticStyles({
  card: {
    borderRadius: layout.gap,
    overflow: "hidden",
    justifyContent: "center",
    padding: layout.gap * 2,
    marginBottom: layout.gap / 2,
  },
})

export const Card = memo(function Card(props: PropsWithChildren<{
  colorName?: ColorNames,
  maxWidth?: number,
}>) {
  let style: ViewStyle | ViewStyle[] = staticStyles.card
  if (props.maxWidth) {
    style = [staticStyles.card, {maxWidth: props.maxWidth}]
  }

  return (
    <Div
      colorName={props.colorName}
      style={style}>
      {props.children}
    </Div>
  )
})
