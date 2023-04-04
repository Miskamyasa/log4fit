import {Fragment, ReactElement} from "react"
import {ScrollView, View} from "react-native"


import Button from "../components/Button"
import Header from "../components/Header"
import Screen from "../components/Screen"
import Span from "../components/Span"
import {appVersion} from "../constants/common"
import {__t} from "../i18"
import {HomeStackScreenProps} from "../navigation/types"
import {useAppSelector} from "../store"


function AboutScreen({navigation}: HomeStackScreenProps<"AboutScreen">): ReactElement {
    const store = useAppSelector(state => state)

    return (
        <Screen>
            <Header title={__t("aboutScreen.title")} />

            <View style={{flex: 1}}>
                <Span>{__t("aboutScreen.title")}</Span>

                <View style={{marginTop: 20}}>
                    <Span>App Version: {appVersion}</Span>
                </View>
            </View>

            <ScrollView>
                <Span
                    size={16}
                    style={{padding: 10}}>
                    {JSON.stringify(store, null, 2)}
                </Span>
            </ScrollView>

            {navigation.canGoBack() ? (
                <Fragment>
                    <Button
                        onPress={(): void => navigation.goBack()}>
                        {__t("back")}
                    </Button>
                    <View style={{marginBottom: 10}} />
                </Fragment>
            ) : null}

        </Screen>
    )
}

export default AboutScreen
