import {z} from "zod"

import {IMAGES_KEYS} from "../../assets/images"

const categories = z.enum(["custom", "other", "base"])
export type Categories = z.infer<typeof categories>

export const skillSchema = z.object({
  id: z.string(),
  category: categories,
  icon: z.enum(IMAGES_KEYS).optional(),
  title: z.record(z.string(), z.string()),
  description: z.record(z.string(), z.string()),
  image: z.string(),
})
export type Skill = z.infer<typeof skillSchema>

const skillSnapshotSchema = z.object({
  id: z.string(),
  category: z.enum(["custom", "other", "base"]),
  icon: z.string().optional(),
  title: z.record(z.string(), z.string()),
  description: z.record(z.string(), z.string()),
  image: z.string(),
})

export const skillsSnapshotSchema = z.array(skillSnapshotSchema)
export type SkillsSnapshot = z.infer<typeof skillsSnapshotSchema>

const approachSchema = z.object({
  id: z.string(),
  skillId: z.string(),
  workoutId: z.string(),
  weight: z.number(),
  repeats: z.number(),
})
export type Approach = z.infer<typeof approachSchema>

export const approachesSnapshotSchema = z.array(approachSchema)
export type ApproachesSnapshot = z.infer<typeof approachesSnapshotSchema>

export const weightsSnapshotSchema = z.record(z.string(), z.enum(["1", "2", "5", "10"]))
export type WeightsSnapshot = z.infer<typeof weightsSnapshotSchema>

const workoutSchema = z.object({
  id: z.string(),
  date: z.number(),
  skills: z.array(z.string()),
})
export type Workout = z.infer<typeof workoutSchema>

export const workoutsSnapshotSchema = z.object({
  array: z.array(workoutSchema),
  current: z.string().optional(),
})
export type WorkoutsSnapshot = z.infer<typeof workoutsSnapshotSchema>

export const STORES_TO_SYNC = [
  "approachesStore",
  "skillsStore",
  "weightsStore",
  "workoutsStore",
] as const

export const appSaveSchema = z.object({
  version: z.string(),
  timestamp: z.number(),
  approachesStore: approachesSnapshotSchema,
  skillsStore: skillsSnapshotSchema,
  weightsStore: weightsSnapshotSchema,
  workoutsStore: workoutsSnapshotSchema,
})

export type AppSaveSnapshot = z.infer<typeof appSaveSchema>

// ── API DTOs (match backend field names) ──

export const apiSnapshotSchema = z.object({
  skills: skillsSnapshotSchema,
  approaches: approachesSnapshotSchema,
  weightSteps: weightsSnapshotSchema,
  workouts: workoutsSnapshotSchema,
})
export type ApiSnapshot = z.infer<typeof apiSnapshotSchema>

/** POST /api/sync request body */
export const syncRequestSchema = z.object({
  skills: skillsSnapshotSchema,
  workouts: workoutsSnapshotSchema,
  approaches: approachesSnapshotSchema,
  weightSteps: weightsSnapshotSchema,
  savedAt: z.number(),
})
export type SyncRequest = z.infer<typeof syncRequestSchema>

/** GET /api/sync — no-data (never-synced user) or existing snapshot */
export const syncGetResponseSchema = z.union([
  z.object({
    serverSnapshot: z.null(),
    savedAt: z.literal(0),
    stats: z.null(),
  }),
  z.object({
    serverSnapshot: apiSnapshotSchema,
    savedAt: z.number(),
    stats: z.unknown().nullable(),
  }),
])
export type SyncGetResponse = z.infer<typeof syncGetResponseSchema>

/** POST /api/sync — ok or conflict (both include server snapshot) */
export const syncPostResponseSchema = z.object({
  saved: z.enum(["ok", "conflict"]),
  savedAt: z.number(),
  serverSnapshot: apiSnapshotSchema,
  stats: z.unknown().nullable(),
})
export type SyncPostResponse = z.infer<typeof syncPostResponseSchema>

export const APP_VERSION = "1.0.0"

export function toSyncRequest(snapshot: AppSaveSnapshot): SyncRequest {
  return {
    skills: snapshot.skillsStore,
    workouts: snapshot.workoutsStore,
    approaches: snapshot.approachesStore,
    weightSteps: snapshot.weightsStore,
    savedAt: snapshot.timestamp,
  }
}

export function toAppSaveSnapshot(savedAt: number, snapshot: ApiSnapshot): AppSaveSnapshot {
  return {
    version: APP_VERSION,
    timestamp: savedAt,
    approachesStore: snapshot.approaches,
    skillsStore: snapshot.skills,
    weightsStore: snapshot.weightSteps,
    workoutsStore: snapshot.workouts,
  }
}
