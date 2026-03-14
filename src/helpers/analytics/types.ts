import {z} from "zod"

export const analyticsEventNameSchema = z.enum([
  "return_to_workout_pressed",
  "create_first_workout",
  "continue_workout_pressed",
  "create_new_workout",
  "goto_add_skill_pressed",
  "increase_repeats_by_button",
  "decrease_repeats_by_button",
  "add_approach_form_open",
  "new_skill_form_open",
  "return_to_workout_approved",
  "blur_input",
  "increase_weight_by_button",
  "decrease_weight_by_button",
  "add_approach_form_submit",
  "show_info_for_skill",
  "add_skill_to_workout",
  "new_skill_form_submit",
  "swipe_across_approaches",
  "change_skill_swipe",
  "error_happened",
  "screen_change",
])
export type AnalyticsEventName = z.infer<typeof analyticsEventNameSchema>

export const analyticsAppSchema = z.object({
  name: z.literal("log4fit"),
  version: z.string().min(1),
  buildNumber: z.string().optional(),
  environment: z.string().min(1),
})
export type AnalyticsApp = z.infer<typeof analyticsAppSchema>

export const analyticsDeviceSchema = z.object({
  platform: z.enum(["ios", "android"]),
  osVersion: z.string().optional(),
  locale: z.string().optional(),
  timezone: z.string().optional(),
})
export type AnalyticsDevice = z.infer<typeof analyticsDeviceSchema>

export const analyticsSessionSchema = z.object({
  sessionId: z.string().min(1),
  userId: z.string().nullable().optional(),
})
export type AnalyticsSession = z.infer<typeof analyticsSessionSchema>

const noParamsSchema = z.object({})

const returnToWorkoutApprovedParamsSchema = z.object({
  return_date: z.string(),
})

const blurInputParamsSchema = z.object({
  name: z.string(),
  value: z.string(),
})

const weightByButtonParamsSchema = z.object({
  step: z.enum(["1", "2", "5", "10"]),
})

const addApproachFormSubmitParamsSchema = z.object({
  skill: z.string(),
  weight: z.number(),
  repeats: z.number(),
})

const titleParamsSchema = z.object({
  title: z.string(),
})

const swipeParamsSchema = z.object({
  content_offset: z.string(),
  content_size: z.string(),
  layout_measurement: z.string(),
})

const errorHappenedParamsSchema = z.object({
  source: z.string(),
  message: z.string().optional(),
  name: z.string().optional(),
  stack: z.string().optional(),
  trace: z.string().optional(),
  value: z.string().optional(),
}).catchall(z.unknown())

const screenChangeParamsSchema = z.object({
  prevRoute: z.string(),
  currRoute: z.string(),
  time: z.number(),
})

export const analyticsEventParamsSchemaMap = {
  return_to_workout_pressed: noParamsSchema,
  create_first_workout: noParamsSchema,
  continue_workout_pressed: noParamsSchema,
  create_new_workout: noParamsSchema,
  goto_add_skill_pressed: noParamsSchema,
  increase_repeats_by_button: noParamsSchema,
  decrease_repeats_by_button: noParamsSchema,
  add_approach_form_open: noParamsSchema,
  new_skill_form_open: noParamsSchema,
  return_to_workout_approved: returnToWorkoutApprovedParamsSchema,
  blur_input: blurInputParamsSchema,
  increase_weight_by_button: weightByButtonParamsSchema,
  decrease_weight_by_button: weightByButtonParamsSchema,
  add_approach_form_submit: addApproachFormSubmitParamsSchema,
  show_info_for_skill: titleParamsSchema,
  add_skill_to_workout: titleParamsSchema,
  new_skill_form_submit: titleParamsSchema,
  swipe_across_approaches: swipeParamsSchema,
  change_skill_swipe: swipeParamsSchema,
  error_happened: errorHappenedParamsSchema,
  screen_change: screenChangeParamsSchema,
} as const

export type AnalyticsEventParamsMap = {
  [K in AnalyticsEventName]: z.infer<(typeof analyticsEventParamsSchemaMap)[K]>
}

export const analyticsEventSchema = z.discriminatedUnion("name", [
  z.object({
    eventId: z.string().min(1),
    name: z.literal("return_to_workout_pressed"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.return_to_workout_pressed,
  }),
  z.object({
    eventId: z.string().min(1),
    name: z.literal("create_first_workout"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.create_first_workout,
  }),
  z.object({
    eventId: z.string().min(1),
    name: z.literal("continue_workout_pressed"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.continue_workout_pressed,
  }),
  z.object({
    eventId: z.string().min(1),
    name: z.literal("create_new_workout"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.create_new_workout,
  }),
  z.object({
    eventId: z.string().min(1),
    name: z.literal("goto_add_skill_pressed"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.goto_add_skill_pressed,
  }),
  z.object({
    eventId: z.string().min(1),
    name: z.literal("increase_repeats_by_button"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.increase_repeats_by_button,
  }),
  z.object({
    eventId: z.string().min(1),
    name: z.literal("decrease_repeats_by_button"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.decrease_repeats_by_button,
  }),
  z.object({
    eventId: z.string().min(1),
    name: z.literal("add_approach_form_open"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.add_approach_form_open,
  }),
  z.object({
    eventId: z.string().min(1),
    name: z.literal("new_skill_form_open"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.new_skill_form_open,
  }),
  z.object({
    eventId: z.string().min(1),
    name: z.literal("return_to_workout_approved"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.return_to_workout_approved,
  }),
  z.object({
    eventId: z.string().min(1),
    name: z.literal("blur_input"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.blur_input,
  }),
  z.object({
    eventId: z.string().min(1),
    name: z.literal("increase_weight_by_button"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.increase_weight_by_button,
  }),
  z.object({
    eventId: z.string().min(1),
    name: z.literal("decrease_weight_by_button"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.decrease_weight_by_button,
  }),
  z.object({
    eventId: z.string().min(1),
    name: z.literal("add_approach_form_submit"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.add_approach_form_submit,
  }),
  z.object({
    eventId: z.string().min(1),
    name: z.literal("show_info_for_skill"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.show_info_for_skill,
  }),
  z.object({
    eventId: z.string().min(1),
    name: z.literal("add_skill_to_workout"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.add_skill_to_workout,
  }),
  z.object({
    eventId: z.string().min(1),
    name: z.literal("new_skill_form_submit"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.new_skill_form_submit,
  }),
  z.object({
    eventId: z.string().min(1),
    name: z.literal("swipe_across_approaches"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.swipe_across_approaches,
  }),
  z.object({
    eventId: z.string().min(1),
    name: z.literal("change_skill_swipe"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.change_skill_swipe,
  }),
  z.object({
    eventId: z.string().min(1),
    name: z.literal("error_happened"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.error_happened,
  }),
  z.object({
    eventId: z.string().min(1),
    name: z.literal("screen_change"),
    timestamp: z.string().min(1),
    params: analyticsEventParamsSchemaMap.screen_change,
  }),
])
export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>

export const analyticsBatchRequestSchema = z.object({
  app: analyticsAppSchema,
  device: analyticsDeviceSchema,
  session: analyticsSessionSchema,
  events: z.array(analyticsEventSchema).min(1).max(500),
}).strict()
export type AnalyticsBatchRequest = z.infer<typeof analyticsBatchRequestSchema>

export const analyticsSuccessResponseSchema = z.object({
  accepted: z.literal(true),
  ingested: z.number(),
  failed: z.number(),
})
export type AnalyticsSuccessResponse = z.infer<typeof analyticsSuccessResponseSchema>

export const analyticsValidationErrorResponseSchema = z.object({
  accepted: z.literal(false),
  error: z.literal("validation_error"),
  details: z.array(z.string()),
})
export type AnalyticsValidationErrorResponse = z.infer<typeof analyticsValidationErrorResponseSchema>

export const analyticsForbiddenErrorResponseSchema = z.object({
  error: z.literal("forbidden"),
})
export type AnalyticsForbiddenErrorResponse = z.infer<typeof analyticsForbiddenErrorResponseSchema>

export const analyticsInternalServerErrorResponseSchema = z.object({
  error: z.literal("internal server error"),
})
export type AnalyticsInternalServerErrorResponse = z.infer<typeof analyticsInternalServerErrorResponseSchema>

export const analyticsErrorResponseSchema = z.union([
  analyticsValidationErrorResponseSchema,
  analyticsForbiddenErrorResponseSchema,
  analyticsInternalServerErrorResponseSchema,
])
export type AnalyticsErrorResponse = z.infer<typeof analyticsErrorResponseSchema>
