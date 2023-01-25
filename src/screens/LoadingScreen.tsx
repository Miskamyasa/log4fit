import {useEffect} from "react"

import ErrorHandler from "../helpers/ErrorHandler"
import {HomeStackScreenProps} from "../navigation/types"
import {useAppDispatch, useAppSelector} from "../store"
import {fetchSkills} from "../store/skills/actions"


function LoadingScreen({navigation}: HomeStackScreenProps<"LoadingScreen">): null {
  const dispatch = useAppDispatch()

  // 1️⃣ - FETCH EXERCISES STORE
  useEffect(() => {
    dispatch(fetchSkills())
  }, [dispatch])

  const baseSkills = useAppSelector(state => state.skills.ids.base)

  // 2️⃣ - REDIRECT HOME
  useEffect(() => {
    // App ready to load
    if (baseSkills.length > 0) {
      return navigation.replace("HomeScreen")
    }

    const timer = setTimeout(() => {
      ErrorHandler(new Error("Loading screen"))
    }, 5000)

    return (): void => {
      clearTimeout(timer)
    }

  }, [navigation, baseSkills.length])

  return null
}

export default LoadingScreen
