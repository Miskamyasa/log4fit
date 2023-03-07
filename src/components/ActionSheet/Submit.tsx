import {ReactElement} from "react"
import {StyleSheet} from "react-native"

import {primaryColors} from "../../colors/colors"
import {allButtons, controlHeight} from "../../features/workout/styles"
import Div from "../Div"
import Span from "../Span"


interface Props {
  text: string
  onPress: () => void
}

const styles = StyleSheet.create({
  root: {
    ...allButtons,
    width: "100%",
    height: controlHeight + 2,
    alignItems: "center",
  },
})

function Submit({onPress, text}: Props): ReactElement {
  return (
    <Div
      onPress={onPress}
      style={styles.root}
      theme={primaryColors.background}>
      <Span colorName={"alwaysWhite"}>{text}</Span>
    </Div>
  )
}

export default Submit
