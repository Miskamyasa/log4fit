import {createContext, Component, PropsWithChildren, type ReactElement} from "react"

import {defaultRepeats, defaultWeight} from "../../constants/common"

type State = {
    repeats: string
    weight: string
}

type ContextValue = State & {
    handleRepeatsChange: (value: string | number) => void
    handleWeightChange: (value: string | number) => void
}

const initialState = {
    repeats: String(defaultRepeats),
    weight: String(defaultWeight),
}

const AddApproachContext = createContext<ContextValue>({
    ...initialState,
    handleRepeatsChange: () => undefined,
    handleWeightChange: () => undefined,
})

function validateRepeats(str = "1"): string {
    const n = parseInt(str, 10)
    if (!Number.isFinite(n) || n <= 1) {
        return "1"
    }
    if (n > 99) {
        return "99"
    }
    return String(n)
}

function validateWeight(str = "0"): string {
    const [val, dec] = str.split(".")
    if (str.split(".").length === 1) {
        const n = Number(str)
        if (!Number.isFinite(n) || n <= 0) {
            return "0"
        }
        if (n > 999) {
            return "999"
        }
        return String(n)
    }
    return `${val}.${dec}`
}

class AddApproachProvider extends Component<State & PropsWithChildren> {
    setValue = (key: keyof State, value: string): void => this.setState(() => ({[key]: value}))

    handleRepeatsChange = (value: string | number): void => {
        this.setValue("repeats", validateRepeats(String(value)))
    }

    handleWeightChange = (value: string | number): void => {
        this.setValue("weight", validateWeight(String(value)))
    }

    state = {
        repeats: this.props.repeats,
        weight: this.props.weight,
        handleRepeatsChange: this.handleRepeatsChange,
        handleWeightChange: this.handleWeightChange,
    }

    render(): ReactElement {
        return (
            <AddApproachContext.Provider
                value={this.state}>
                {this.props.children}
            </AddApproachContext.Provider>
        )
    }
}

export {AddApproachContext, AddApproachProvider}
