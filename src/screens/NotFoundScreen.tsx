import {useEffect} from "react";

import {RootStackScreenProps} from "../navigation/types";


function NotFoundScreen({navigation}: RootStackScreenProps<"NotFound">): null {
  useEffect(() => {
    navigation.replace("Loading");
  }, [navigation]);

  return null;
}

export default NotFoundScreen;
