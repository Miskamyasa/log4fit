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

export type StoreName = typeof STORES_TO_SYNC[number]

export const appSaveSchema = z.object({
  version: z.string(),
  timestamp: z.number(),
  approachesStore: approachesSnapshotSchema,
  skillsStore: skillsSnapshotSchema,
  weightsStore: weightsSnapshotSchema,
  workoutsStore: workoutsSnapshotSchema,
})

export type AppSaveSnapshot = z.infer<typeof appSaveSchema>
