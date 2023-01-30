import {createContext, Component, PropsWithChildren, ReactElement} from "react"


type State = {
  repeats: string,
  weight: string,
}

type ContextValue = State & {
  handleRepeatsChange: (value: string | number) => void,
  handleWeightChange: (value: string | number) => void,
}


const initialState = {
  repeats: "10",
  weight: "0",
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
  state = {
    repeats: this.props.repeats,
    weight: this.props.weight,
  }

  setValue = (key: keyof State, value: string): void => this.setState(() => ({[key]: value}))

  handleRepeatsChange = (value: string | number): void => {
    this.setValue("repeats", validateRepeats(String(value)))
  }

  handleWeightChange = (value: string | number): void => {
    this.setValue("weight", validateWeight(String(value)))
  }

  render(): ReactElement {
    return (
      <AddApproachContext.Provider
        value={{
          ...this.state,
          handleRepeatsChange: this.handleRepeatsChange,
          handleWeightChange: this.handleWeightChange,
        }}>
        {this.props.children}
      </AddApproachContext.Provider>
    )
  }
}

export {AddApproachContext, AddApproachProvider}