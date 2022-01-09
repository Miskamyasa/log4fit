import ExpoFileSystemStorage from "redux-persist-expo-filesystem";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import appJson from "../../app.json";


class Storage  {
  private storage = ExpoFileSystemStorage;
  prefix = __DEV__ ? "@ExpoApp::dev::" : `@ExpoApp::${appJson.expo.slug}::`;

  constructor() {
    this.getItem = this.getItem.bind(this);
    this.setItem = this.setItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  getItem(key: string): Promise<string | null> {
    return this.storage.getItem(this.prefix + key);
  }

  setItem(key: string, data: string): Promise<string> {
    return this.storage.setItem(this.prefix + key, data);
  }

  removeItem(key: string): Promise<void> {
    return this.storage.removeItem(this.prefix + key);
  }
}

export default Storage;
