import {type ReactElement} from "react"
import {StyleSheet, View, ViewStyle} from "react-native"

import {observer} from "mobx-react"

import {Loader} from "../../components/Loader"
import {useStores} from "../../store/useStores"

const container: ViewStyle = {
    marginBottom: 20,
}

const staticStyles = StyleSheet.create({container})

export const SkillsListLoader = observer(function SkillsListLoader(): ReactElement {
    const {skillsStore} = useStores()

    return (
        <View style={staticStyles.container}>
            {skillsStore.loading
                ? (
                    <Loader />
                )
                : null}
        </View>
    )
})
