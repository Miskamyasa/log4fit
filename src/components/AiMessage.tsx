import type {ViewStyle} from "react-native"

import {observer} from "mobx-react"

import {layout} from "../constants/layout"
import {createStaticStyles} from "../helpers/createStaticStyles"
import type {Skill} from "../store/schemas"
import {useStores} from "../store/useStores"

import {Div} from "./Div"
import {Span} from "./Span"

const staticStyles: {
  container: ViewStyle,
} = createStaticStyles({
  text: {
    fontSize: 16,
  },
  container: {
    backgroundColor: "slategrey",
    padding: 20,
    marginBottom: layout.gap,
  },
})

export const AiMessage = observer(function AiMessage(props: {
  skillId: Skill["id"],
}): React.ReactElement | null {
  const {recommendationStore} = useStores()
  const message = recommendationStore.messages[props.skillId]

  if (!message) {
    return null
  }

  return (
    <Div style={staticStyles.container}>
      <Span>{message}</Span>
    </Div>
  )
})
