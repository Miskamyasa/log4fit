import {useEffect} from "react";
import {Alert} from "react-native";

import * as Updates from "expo-updates";

import {getUserId} from "../auth";
import db from "../db";
import {__t} from "../i18";
import {HomeStackScreenProps} from "../navigation/types";
import {useAppDispatch, useAppSelector} from "../store";
import {setUserId} from "../store/common/actions";
import {fetchExercises} from "../store/exercises/actions";


function LoadingScreen({navigation}: HomeStackScreenProps<"LoadingScreen">): null {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(state => state.common.userId);

  // 1️⃣ - INIT API & AUTH
  useEffect(() => {
    if (!userId) {
      void db.init()
        .then(() => getUserId())
        .then((id) => id && dispatch(setUserId(id)));
    }
  }, [userId, dispatch]);

  // 2️⃣ - FETCH EXERCISES STORE
  useEffect(() => {
    if (userId) {
      dispatch(fetchExercises());
    }
  }, [userId, dispatch]);

  const baseExercises = useAppSelector(state => state.exercises.ids.base);

  // 3️⃣ - REDIRECT HOME
  useEffect(() => {

    if (userId && baseExercises.length > 0) { // App ready to load
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

  }, [userId, navigation, baseExercises.length]);

  return null;
}

export default LoadingScreen;
