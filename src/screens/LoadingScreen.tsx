import {useEffect} from "react";

import {RootStackScreenProps} from "../navigation/types";
import {useAppSelector} from "../store";


function LoadingScreen({navigation}: RootStackScreenProps<"Loading">): null {
  const welcome = useAppSelector(state => state.common.welcome);

  useEffect(() => {
    if (welcome) {
      navigation.replace("Welcome");
      return;
    }
    navigation.replace("Home");
  }, [navigation, welcome]);

  return null ;
}

export default LoadingScreen;
