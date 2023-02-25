import {memo, PropsWithChildren, ReactElement} from "react"
import {ViewStyle} from "react-native"

import {ColorNames} from "../colors/types"
import layout from "../constants/layout"
import createStaticStyles from "../helpers/createStaticStyles"

import Div from "./Div"


const staticStyles = createStaticStyles({
  card: {
    borderRadius: layout.gap,
    overflow: "hidden",
    justifyContent: "center",
    padding: layout.gap * 2,
    marginBottom: layout.gap / 2,
  },
})

interface _Props extends PropsWithChildren {
  colorName?: ColorNames
  maxWidth?: number
}

function Card(props: _Props): ReactElement {
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
}

export default memo(Card)
