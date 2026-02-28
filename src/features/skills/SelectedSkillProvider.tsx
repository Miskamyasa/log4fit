import {createContext, Component, type ReactNode} from "react"

import type {Skill} from "../../store/schemas"

type ContextValue = {
  selected: null | Skill,
  setSelected: (selected: Skill | null) => void,
}

const SelectedSkillContext = createContext<ContextValue>({
  selected: null,
  setSelected: () => undefined,
})

SelectedSkillContext.displayName = "SelectedSkillContext"

class SelectedSkillProvider extends Component<{children: ReactNode}> {
  setSelected = (selected: Skill | null): void => {this.setState(() => ({selected}))}

  state = {
    selected: null,
    setSelected: this.setSelected,
  }

  render() {
    return (
      <SelectedSkillContext
        value={this.state}>
        {this.props.children}
      </SelectedSkillContext>
    )
  }
}

export {SelectedSkillContext, SelectedSkillProvider}
