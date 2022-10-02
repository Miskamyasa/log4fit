import {ReactElement, useEffect, useMemo, useState} from "react";
import {Image, ImageStyle, ScrollView, StyleSheet, View, ViewStyle} from "react-native";

import {ThemeProps, useThemeColor} from "../colors";
import Header from "../components/Header";
import OverlayLoader from "../components/OverlayLoader";
import Screen from "../components/Screen";
import Span from "../components/Span";
import {getTranslation} from "../db/Translations";
import {__locale} from "../i18";
import layout from "../layout/constants";
import {HomeStackScreenProps} from "../navigation/types";
import {useAppSelector} from "../store";


const colors: ThemeProps = {
  light: "#fefefe",
  dark: "rgba(14, 16, 18, 0.82)",
};

const container: ViewStyle = {
  padding: layout.gap,
};

const image: ImageStyle = {
  width: "100%",
  resizeMode: "center",
  minHeight: layout.height / 4,
  borderRadius: 15,
  overflow: "hidden",
  backgroundColor: "#e1e3e5",
};

const content: ViewStyle = {
  minHeight: layout.height / 5,
  borderRadius: 15,
  overflow: "hidden",
  marginTop: layout.gap,
};

const paddings: ViewStyle = {
  padding: layout.gap * 1.4,
};

const staticStyles = StyleSheet.create({
  container,
  image,
  content,
  paddings,
});

async function getDescription(id: string, callback: (str?: string) => void): Promise<void> {
  try {
    const snapshot = await getTranslation(id);
    if (snapshot) {
      callback(snapshot.text || "");
    }
  } catch (e) {
    callback();
  }
}

function ExerciseInfoScreen({route}: HomeStackScreenProps<"ExerciseInfoScreen">): ReactElement {
  const exercise = useAppSelector(state => state.exercises.store[route.params?.id]);

  const [ready, setReady] = useState(false);
  const [description, setDescription] = useState("");

  const locale = __locale();

  useEffect(() => {
    void getDescription(exercise.description[locale], (res) => {
      if (res) {
        setDescription(res);
      }
      setReady(true);
    });
  }, [locale, exercise]);

  const backgroundColor = useThemeColor("viewBackground", colors);
  const contentStyle = useMemo(() => {
    return StyleSheet.compose(staticStyles.content, {backgroundColor});
  }, [backgroundColor]);

  return (
    <Screen>
      <Header title={exercise.title[locale]} />

      <ScrollView contentContainerStyle={staticStyles.container}>

        {exercise.image ? (
          <Image
            style={staticStyles.image}
            source={{uri: exercise.image}} />
        ) : null}

        <View style={contentStyle}>
          {!ready ? (
            <OverlayLoader />
          ) : (
            <View style={staticStyles.paddings}>
              <Span size={16}>
                {description}
              </Span>
            </View>
          )}
        </View>

      </ScrollView>

    </Screen>
  );
}

export default ExerciseInfoScreen;
