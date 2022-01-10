import delay from "delay";

import {storage} from "../storage";
import exercises from "./json/exercises.json";
import translations from "./json/translations.json";
import {Collections, DB_BaseItem} from "./types";


async function init(): Promise<void> {
  try {
    await storage.setItem("exercises", JSON.stringify(exercises));
    await storage.setItem("translations", JSON.stringify(translations));
    await storage.setItem("workouts", JSON.stringify([]));
    await storage.setItem("custom", JSON.stringify([]));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
}

async function getCollection<T>(key: Collections, params?: Record<string, string>): Promise<T[]> {
  let data: T[] = [];
  try {
    let path: string = key;
    if (params) {
      path = path + "::" + JSON.stringify(params);
    }
    const str = await storage.getItem(path);
    if (str) {
      data = JSON.parse(String(str));
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
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
    // eslint-disable-next-line no-console
    console.warn(e);
  }
}

async function setItem<T extends DB_BaseItem>(key: Collections, data: T): Promise<boolean> {
  try {
    const collection = await getCollection<DB_BaseItem>(key);
    if (!collection.find(item => item.id === data.id)) {
      collection.push(data);
      await storage.setItem(key, JSON.stringify(collection));
    }
    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
    return false;
  }
}

async function retry(fn: () => Promise<boolean>): Promise<void> {
  let success = false;
  while (!success) {
    await delay(10000);
    success = await fn();
  }
}

const db = {
  init,
  getCollection,
  getById,
  setItem,
  retry,
};

export default db;
