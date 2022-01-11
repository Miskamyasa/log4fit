// import ExpoFileSystemStorage from "redux-persist-expo-filesystem";
import AsyncStorage from "@react-native-async-storage/async-storage";

import appJson from "../../app.json";
import ErrorHandler from "../helpers/ErrorHandler";


class Storage  {
  private storage = AsyncStorage;
  prefix = __DEV__ ? "@Log4Fit::dev::" : `@Log4Fit::${appJson.expo.slug}::`;

  constructor() {
    this.getItem = this.getItem.bind(this);
    this.setItem = this.setItem.bind(this);
    this.removeItem = this.removeItem.bind(this);

    // 🐝 DEBUG THIS
    // this.storage.getAllKeys().then(arr => {
    //   console.log({arr})
    //   arr.forEach((k) => {
    //     console.log({store: this.storage.getItem(k)});
    //     // this.storage.removeItem(k)
    //   })
    // });
  }

  async getItem(key: string): Promise<string | undefined> {
    try {
      const data = await this.storage.getItem(this.prefix + key);
      // ...
      return data || undefined;
    } catch (e) {
      ErrorHandler(e);
    }
  }

  async setItem(key: string, data: string): Promise<undefined> {
    try {
      await this.storage.setItem(this.prefix + key, data);
      // ...
      return;
    } catch (e) {
      ErrorHandler(e);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await this.storage.removeItem(this.prefix + key);
      return;
    } catch (e) {
      ErrorHandler(e);
    }
  }
}

export default Storage;
