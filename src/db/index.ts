import ErrorHandler from "../helpers/ErrorHandler";
import {storage} from "../storage";
import exercises from "./json/exercises.json";
import translations from "./json/translations.json";
import {CollectionParams, Collections, DB_BaseItem} from "./types";


function createPath(key: Collections, params?: CollectionParams): string {
  let path: string = key;
  if (params) {
    path = path + "::" + JSON.stringify(params);
  }
  return path;
}

async function init(): Promise<void> {
  try {
    /* eslint-disable */
    // 🐝 DEBUG
    // await Promise
    //   .all([storage.getItem("workouts"), storage.getItem("custom")])
    //   .then(async ([w = "", custom]) => {
    //     console.log({custom});
    //     const workouts = JSON.parse(w);
    //     console.log({workouts});
    //     for (const el of workouts) {
    //       console.log({approaches: await getCollection("approaches", {workoutId: el.id})});
    //     }
    //   });

    // await Promise.all([
    //   storage.removeItem("workouts"),
    //   storage.removeItem("approaches"),
    //   storage.removeItem("custom"),
    // ]);
    /* eslint-enable */

    await storage.setItem("exercises", JSON.stringify(exercises));
    await storage.setItem("translations", JSON.stringify(translations));
  } catch (e) {
    ErrorHandler(e);
  }
}

async function getCollection<T>(key: Collections, params?: CollectionParams): Promise<T[]> {
  const path = createPath(key, params);
  let data: T[] = [];
  try {
    const str = await storage.getItem(path);
    if (str) {
      data = JSON.parse(String(str));
    }
  } catch (e) {
    ErrorHandler(e);
  }
  return data;
}


async function getById<T extends DB_BaseItem>(key: Collections, id: string): Promise<T | void> {
  try {
    const collection = await getCollection<T>(key);
    if (collection) {
      const data = collection.find((item: DB_BaseItem) => item.id === id);
      return data;
    }
  } catch (e) {
    ErrorHandler(e);
  }
}

async function setItem<T extends DB_BaseItem>(key: Collections, data: T, params?: CollectionParams): Promise<void> {
  const path = createPath(key, params);
  try {
    const collection = await getCollection<DB_BaseItem>(key, params);
    const idx = collection.findIndex(item => item.id === data.id);
    if (idx !== -1) {
      collection[idx] = data;
    } else {
      collection.push(data);
    }
    await storage.setItem(path, JSON.stringify(collection));
  } catch (e) {
    ErrorHandler(e);
  }
}

const db = {
  init,
  getCollection,
  getById,
  setItem,
};

export default db;
