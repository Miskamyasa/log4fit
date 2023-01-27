import {createContext, Component, PropsWithChildren, ReactElement} from "react"

import {Skill} from "../../store/skills/types"


type ContextValue = {
  selected: null | Skill,
  setSelected: (selected: Skill | null) => void,
}

const SelectedSkillContext = createContext<ContextValue>({
  selected: null,
  setSelected: () => undefined,
})

SelectedSkillContext.displayName = "SelectedSkillContext"

class SelectedSkillProvider extends Component<PropsWithChildren> {
  state = {
    selected: null,
  }

  setSelected = (selected: Skill | null): void => this.setState(() => ({selected}))

  render(): ReactElement {
    return (
      <SelectedSkillContext.Provider
        value={{
          selected: this.state.selected,
          setSelected: this.setSelected,
        }}>
        {this.props.children}
      </SelectedSkillContext.Provider>
    )
  }
}

export {SelectedSkillContext, SelectedSkillProvider}
