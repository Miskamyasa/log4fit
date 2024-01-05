import {ReactElement, useState, useRef, useCallback} from "react"
import {TextStyle, ViewStyle, StyleSheet, View, TextInput} from "react-native"

import Container from "../../components/ActionSheet/Container"
import Submit from "../../components/ActionSheet/Submit"
import Title from "../../components/ActionSheet/Title"
import Row from "../../components/Row"
import Span from "../../components/Span"
import {__t} from "../../helpers/i18n"
import Input from "../workout/Input"


interface Props {
    submit: (value: string) => void
    dismiss: () => void
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

function NewSkillForm(props: Props): ReactElement {
    const [value, setValue] = useState<string>("")

    const handleSubmit = (): void => props.submit(value)

    const inputRef = useRef<TextInput>(null)
    const handleInputLayout = useCallback((): void => {
        inputRef.current?.focus()
    }, [])

    return (
        <Container>
            <Title onClosePress={props.dismiss}>
                {__t("exercises.create")}
            </Title>
            <Row>
                <View style={staticStyles.view}>
                    <Span style={staticStyles.label}>{__t("exercises.createInput")}</Span>
                    <Input
                        ignoreAnalyticsValue={""}
                        inputRef={inputRef}
                        keyboardType={"default"}
                        maxLength={26}
                        name={"newSkill"}
                        style={staticStyles.input}
                        value={value}
                        onChange={setValue}
                        onLayout={handleInputLayout} />
                </View>
            </Row>
            <Submit
                text={__t("save")}
                onPress={handleSubmit} />
        </Container>
    )
}


export default NewSkillForm
