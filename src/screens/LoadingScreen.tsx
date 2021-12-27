import {useEffect} from "react";

import {HomeStackScreenProps} from "../navigation/types";


function LoadingScreen({navigation}: HomeStackScreenProps<"LoadingScreen">): null {

  useEffect(() => {
    navigation.replace("HomeScreen");
  }, [navigation]);

  return null ;
}

export default LoadingScreen;
