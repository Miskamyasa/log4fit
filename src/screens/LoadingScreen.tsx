import {useEffect} from "react";

import {getUserId} from "../auth";
import db from "../db";
import ErrorHandler from "../helpers/ErrorHandler";
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

    // App ready to load
    if (userId && baseExercises.length > 0) {
      return navigation.replace("HomeScreen");
    }

    const timer = setTimeout(() => {
      ErrorHandler(new Error("Loading screen"));
    }, 5000);

    return (): void => {
      clearTimeout(timer);
    };

  }, [userId, navigation, baseExercises.length]);

  return null;
}

export default LoadingScreen;
