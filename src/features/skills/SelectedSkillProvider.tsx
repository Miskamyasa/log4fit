import {createContext, Component, type ReactElement, type ReactNode} from "react"

import type {Skill} from "../../store/skills/SkillsStore"

interface ContextValue {
    selected: null | Skill
    setSelected: (selected: Skill | null) => void
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

    render(): ReactElement {
        return (
            <SelectedSkillContext
                value={this.state}>
                {this.props.children}
            </SelectedSkillContext>
        )
    }
}

export {SelectedSkillContext, SelectedSkillProvider}
