
import type {ImagesKey} from "../../assets/images"
import {layout} from "../constants/layout"
import {createStaticStyles} from "../helpers/createStaticStyles"

import {Div} from "./Div"
import {SkillImage} from "./SkillImage"
import {Span} from "./Span"

const styles = createStaticStyles({
  container: {
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: layout.gap / 2,
    overflow: "hidden",
    flexDirection: "row",
  },
  text: {
    fontSize: 15,
  },
})

export function PageTitle({title, icon}: {
  title: string,
  icon?: ImagesKey,
}) {
  return (
    <Div style={styles.container}>
      {icon && (
        <SkillImage name={icon} />
      )}
      <Span style={styles.text}>{title}</Span>
    </Div>
  )
}
