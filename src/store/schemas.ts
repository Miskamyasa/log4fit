
export const approachSchema = z.object({
  id: z.string(),
  skillId: z.string(),
  workoutId: z.string(),
  weight: z.number(),
  repeats: z.number(),
})
