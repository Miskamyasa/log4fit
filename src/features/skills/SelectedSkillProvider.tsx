import {createContext, Component, PropsWithChildren} from "react"

import {Skill} from "../../store/skills/types"

type ContextValue = {
    selected: null | Skill
    setSelected: (selected: Skill | null) => void
}

const SelectedSkillContext = createContext<ContextValue>({
    selected: null,
    setSelected: () => undefined,
})

SelectedSkillContext.displayName = "SelectedSkillContext"

class SelectedSkillProvider extends Component<PropsWithChildren> {
    setSelected = (selected: Skill | null): void => this.setState(() => ({selected}))

    state = {
        selected: null,
        setSelected: this.setSelected,
    }

    render() {
        return (
            <SelectedSkillContext.Provider
                value={this.state}>
                {this.props.children}
            </SelectedSkillContext.Provider>
        )
    }
}

export {SelectedSkillContext, SelectedSkillProvider}
