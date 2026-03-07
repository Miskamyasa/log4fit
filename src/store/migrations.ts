import {storage} from "../helpers/storage"

import {
  type AppSaveSnapshot,
  approachesSnapshotSchema,
  skillsSnapshotSchema,
  workoutsSnapshotSchema,
} from "./schemas"

const OLD_KEYS = {
  approaches: "approaches",
  skills: "skills",
  workouts: "workouts",
} as const

export async function migrateFromLegacyStorage(): Promise<AppSaveSnapshot | null> {
  const [approaches, skills, workouts] = await Promise.all([
    storage.getItem(OLD_KEYS.approaches),
    storage.getItem(OLD_KEYS.skills),
    storage.getItem(OLD_KEYS.workouts),
  ])

  const hasLegacyData = approaches ?? skills ?? workouts
  if (!hasLegacyData) {
    return null
  }

  const snapshot: AppSaveSnapshot = {
    version: "1.0.0",
    timestamp: Date.now(),
    approachesStore: approaches
      ? approachesSnapshotSchema.parse(JSON.parse(approaches))
      : [],
    skillsStore: skills
      ? skillsSnapshotSchema.parse(JSON.parse(skills))
      : [],
    workoutsStore: workouts
      ? workoutsSnapshotSchema.parse(JSON.parse(workouts))
      : {array: []},
  }

  return snapshot
}
