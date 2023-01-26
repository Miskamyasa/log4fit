import {ReactElement, useState} from "react"
import {TextStyle, ViewStyle, StyleSheet, View} from "react-native"

import Container from "../../components/ActionSheet/Container"
import Row from "../../components/ActionSheet/Row"
import Submit from "../../components/ActionSheet/Submit"
import Title from "../../components/ActionSheet/Title"
import Span from "../../components/Span"
import {__t} from "../../i18"
import Input from "../workout/Input"


type _Props = {
  submit: (value: string) => void,
  dismiss: () => void,
}

const label: TextStyle = {
  fontSize: 15,
  marginBottom: 3,
}

const view: ViewStyle = {
  flex: 1,
}

const input: TextStyle = {
  height: 48,
  fontSize: 20,
  fontWeight: "600",
}

const staticStyles = StyleSheet.create({
  label,
  view,
  input,
})

function NewSkillForm(props: _Props): ReactElement {
  const {submit, dismiss} = props

  const [value, setValue] = useState<string>("")

  const handleSubmit = (): void => submit(value)

  return (
    <Container>
      <Title onClosePress={dismiss}>
        {__t("exercises.create")}
      </Title>
      <Row>
        <View style={staticStyles.view}>
          <Span style={staticStyles.label}>{__t("exercises.createInput")}</Span>
          <Input
            keyboardType={"default"}
            maxLength={26}
            style={staticStyles.input}
            value={value}
            onChange={setValue} />
        </View>
      </Row>
      <Submit
        text={__t("save")}
        onPress={handleSubmit} />
    </Container>
  )
}


export default NewSkillForm
