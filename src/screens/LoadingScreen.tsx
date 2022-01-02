import {useEffect} from "react";
import {Alert} from "react-native";

import * as Updates from "expo-updates";

import {__t} from "../i18";
import {HomeStackScreenProps} from "../navigation/types";
import {useAppDispatch, useAppSelector} from "../store";
import {fetchExercises} from "../store/exercises/actions";


function LoadingScreen({navigation}: HomeStackScreenProps<"LoadingScreen">): null {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchExercises());
  }, [dispatch]);

  const baseExercises = useAppSelector(state => state.exercises.ids.base);

  useEffect(() => {

    if (baseExercises.length > 0) { // App ready to load
      // TODO : select first screen to load
      // navigation.replace("ExercisesScreen");
      return navigation.replace("HomeScreen");
    }

    const timer = setTimeout(() => {
      // TODO send message to error handler & error text to user
      Alert.alert("", "Error", [
        {text: __t("reload"), onPress: (): void => void Updates.reloadAsync()},
      ]);
    }, 5000);

    return (): void => {
      clearTimeout(timer);
    };

  }, [navigation, baseExercises.length]);

  return null;
}

export default LoadingScreen;
