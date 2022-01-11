export interface DB_BaseItem {
  id: string;
}

export type Collections =
  | "exercises"
  | "custom"
  | "approaches"
  | "translations"
  | "workouts"
;

export type CollectionParams = Record<string, string>;
