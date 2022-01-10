import {Locales} from "../i18";
import db from "./index";
import {DB_BaseItem} from "./types";

// server acceptable categories
export const backendCategories = Object.freeze({other: "other", base: "base"});

export type DB_BackendCategories = keyof typeof backendCategories;

export interface DB_Exercise<T = DB_BackendCategories> extends DB_BaseItem {
  readonly category: T;
  readonly icon: string;
  readonly title: Record<Locales, string>;
  readonly description: Record<Locales, string>;
  readonly image: string;
}

export async function getExercises(): Promise<DB_Exercise[]> {
  let res: DB_Exercise[] = [];
  try {
    res = await db.getCollection("exercises");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
  return res;
}
