import {StyleSheet, View} from "react-native"

import {observer} from "mobx-react"

import {Loader} from "../../components/Loader"
import {useStores} from "../../store/useStores"

const staticStyles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
})

export const SkillsListLoader = observer(function SkillsListLoader() {
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
