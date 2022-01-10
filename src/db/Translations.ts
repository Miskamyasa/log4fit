import {Locales} from "../i18";
import db from "./index";
import {DB_BaseItem} from "./types";


export interface DB_Translation extends DB_BaseItem {
  readonly locale: Locales;
  readonly text: string;
}

export async function getTranslation(id: DB_BaseItem["id"]): Promise<DB_Translation | void> {
  try {
    const snapshot = await db.getById<DB_Translation>("translations", id);
    if (snapshot) {
      return snapshot;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
}
