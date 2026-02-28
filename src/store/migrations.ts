import {storage} from "../helpers/storage"

import {
  type AppSaveSnapshot,
  approachesSnapshotSchema,
  skillsSnapshotSchema,
  weightsSnapshotSchema,
  workoutsSnapshotSchema,
} from "./schemas"

const OLD_KEYS = {
  approaches: "approaches",
  skills: "skills",
  weights: "weightSteps",
  workouts: "workouts",
} as const

export async function migrateFromLegacyStorage(): Promise<AppSaveSnapshot | null> {
  const [approaches, skills, weights, workouts] = await Promise.all([
    storage.getItem(OLD_KEYS.approaches),
    storage.getItem(OLD_KEYS.skills),
    storage.getItem(OLD_KEYS.weights),
    storage.getItem(OLD_KEYS.workouts),
  ])

  const hasLegacyData = approaches ?? skills ?? weights ?? workouts
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
    weightsStore: weights
      ? weightsSnapshotSchema.parse(JSON.parse(weights))
      : {},
    workoutsStore: workouts
      ? workoutsSnapshotSchema.parse(JSON.parse(workouts))
      : {array: []},
  }

  return snapshot
}
