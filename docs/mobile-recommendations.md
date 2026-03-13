# Mobile Recommendations Contract

## Purpose

This document defines the contract the mobile app uses to receive workout recommendations from the backend.

The mobile app does **not** send recommendation-specific configuration or inputs. Recommendations are computed by the server from the synced user snapshot.

## Ownership

- Owner: `internal/recommendation`
- Mobile input contract owner: `internal/sync`
- Mobile consumers: iOS / Android app

## Authentication

All recommendation endpoints use Clerk JWT authentication.

```http
Authorization: Bearer <clerk_jwt>
```

If the JWT is missing or invalid, the server returns `401 Unauthorized`.

## Source Data

Recommendations are derived from the same snapshot sent to `POST /api/sync`.

The mobile app must continue sending the full snapshot:

```json
{
  "skills": [],
  "workouts": {
    "array": [],
    "current": "01GR..."
  },
  "approaches": [],
  "savedAt": 1740700000000
}
```

Snapshot field definitions are owned by `docs/sync.md`.

Important constraints:

- All entity IDs are ULIDs.
- `savedAt` is Unix milliseconds.
- Weights are kilograms.
- `approaches[].repeats` is numeric.

## Client Flow

The expected mobile flow is:

1. Call `POST /api/sync` with the full local snapshot.
2. Treat recommendation recomputation as asynchronous.
3. Read the latest recommendations using `GET /api/recommendations`.
4. Render recommendations keyed by `skillId`.

The sync response does not inline recommendations.

## Endpoints

### GET /api/recommendations

REST fallback endpoint for fetching the latest computed recommendations.

**Request**

```http
GET /api/recommendations HTTP/1.1
Authorization: Bearer <clerk_jwt>
Accept: application/json
```

**Response**

```json
{
  "skills": {
    "<skillId>": {
      "inferredVariant": "standard",
      "currentPattern": "3x12",
      "currentPosition": 0,
      "nextPattern": "3x10",
      "nextWeight": 42.5,
      "weightStep": 2.5,
      "confidence": 4,
      "isFatigued": false,
      "fatigueAdjustment": null,
      "computedAt": 1740700000000
    }
  }
}
```

**Empty state**

```json
{
  "skills": {}
}
```

This means the server currently has no recommendation rows for the user, or no skill has enough usable history to produce a recommendation.

## Response Schema

Top-level type:

```json
{
  "skills": {
    "<skillId>": {
      "...": "..."
    }
  }
}
```

- `skills` is a map keyed by `skillId`
- Omitted skill IDs mean no recommendation is currently available for that skill

### SkillRecommendation

```json
{
  "inferredVariant": "standard",
  "currentPattern": "3x12",
  "currentPosition": 0,
  "nextPattern": "3x10",
  "nextWeight": 42.5,
  "weightStep": 2.5,
  "confidence": 4,
  "isFatigued": false,
  "fatigueAdjustment": null,
  "computedAt": 1740700000000
}
```

Field meanings:

- `inferredVariant`: server-inferred progression variant. Current values are `standard`, `extended`, `extreme`.
- `currentPattern`: pattern inferred from the latest workout for that skill. Example: `3x12`.
- `currentPosition`: zero-based index of `currentPattern` inside the inferred variant.
- `nextPattern`: next recommended pattern in the inferred variant.
- `nextWeight`: next recommended working weight in kilograms.
- `weightStep`: detected weight increment in kilograms.
- `confidence`: integer confidence score for the inferred variant.
- `isFatigued`: whether the latest workout shows within-session rep drop consistent with fatigue.
- `fatigueAdjustment`: nullable fatigue recommendation for the current session.
- `computedAt`: Unix milliseconds when the recommendation payload was computed.

### FatigueAdjustment

When `isFatigued` is `true`, `fatigueAdjustment` may be:

```json
{
  "pattern": "4x8",
  "weight": 37.5
}
```

Field meanings:

- `pattern`: adjusted pattern derived from the minimum reps achieved in the latest working sets
- `weight`: adjusted working weight in kilograms

When `isFatigued` is `false`, `fatigueAdjustment` is `null`.

## Client Handling Rules

The mobile app should follow these rules:

- Treat the backend as the source of truth for recommendations.
- Do not attempt to send `variantId`, `nextPattern`, or `nextWeight` to the backend as recommendation inputs.
- Treat `inferredVariant` as output only.
- Replace the locally cached recommendation state with the full payload from REST.
- Use `computedAt` for staleness checks if needed.
- If `skills[skillId]` is missing, show no recommendation for that skill.
- If `isFatigued` is `true`, the UI may show both the normal next recommendation and the fatigue adjustment, but the fatigue adjustment applies to the current session context.

## When Recommendations Are Missing

The backend may omit a skill from `skills` when recommendation inference is not reliable enough.

Common reasons:

- fewer than 2 usable workout records for the skill
- latest workout cannot be mapped to a supported pattern
- no valid weight step can be inferred
- variant confidence is too low

The mobile app must treat omission as a normal state, not an error.

## Supported Pattern and Variant Vocabulary

Current pattern names:

- `3x14`, `3x13`, `3x12`, `3x11`, `3x10`
- `4x9`, `4x8`, `4x7`, `4x6`
- `5x5`, `5x4`, `5x3`

Current variants:

- `standard`: `3x12 -> 3x10 -> 4x8 -> 4x6 -> 5x5`
- `extended`: `3x12 -> 3x11 -> 3x10 -> 4x8 -> 4x6 -> 5x5`
- `extreme`: `3x12 -> 3x11 -> 3x10 -> 4x9 -> 4x8 -> 4x7 -> 4x6 -> 5x5`

## Error Contract

Recommendation endpoints currently return:

- `200 OK` with a recommendation payload or empty payload
- `401 Unauthorized` when authentication fails
- `500 Internal Server Error` for unexpected server failures

Error body shape:

```json
{
  "error": "internal server error"
}
```

or

```json
{
  "error": "authentication required"
}
```
