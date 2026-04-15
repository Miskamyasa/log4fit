# Analytics Integration Spec -- Mobile Client

## Summary

The backend now accepts batched analytics events from the mobile app. This document describes everything needed to implement the client-side integration.

## Base URL

```md
https://api.log4fit.app
```

## Endpoint

```md
POST /api/analytics/events
```

## Authentication

Every request must include a static API key in the `X-API-Key` header. The key is bundled in the app binary -- it is not a user credential.

```md
X-API-Key: <api_key>
```

No Clerk JWT is required. The endpoint is intentionally unauthenticated because analytics events fire before, during, and after auth flows -- including from error handlers where no valid session exists.

If the key is missing or wrong, the server returns `403 Forbidden`.

## When to Send

- Batch events and send them periodically or on app background/close.
- The server does not retry delivery -- the app should implement local buffering and retry on network failure.
- Duplicate `eventId` values are silently ignored server-side, so retries are safe.

## Request Format

### Headers

```md
Content-Type: application/json
X-API-Key: <api_key>
```

### Body

```json
{
  "app": {
    "name": "log4fit",
    "version": "2.4.1",
    "buildNumber": "142",
    "environment": "production"
  },
  "device": {
    "platform": "ios",
    "osVersion": "18.3",
    "locale": "en-US",
    "timezone": "Europe/Moscow"
  },
  "session": {
    "sessionId": "01JQXYZ1234567890ABCDEF",
    "userId": "user_2abc123XYZ"
  },
  "events": [
    {
      "eventId": "01JQXYZ0000000000000001",
      "name": "create_new_workout",
      "timestamp": "2026-03-14T12:34:56.789Z",
      "params": {}
    },
    {
      "eventId": "01JQXYZ0000000000000002",
      "name": "add_approach_form_submit",
      "timestamp": "2026-03-14T12:35:10.123Z",
      "params": {
        "skill": "Bench Press",
        "weight": 80,
        "repeats": 12
      }
    }
  ]
}
```

## Field Reference

### app (required)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | Yes | Always `"log4fit"`. Server rejects other values. |
| `version` | string | Yes | Semantic version from expo config (e.g. `"2.4.1"`). |
| `buildNumber` | string | No | Native build number / versionCode (e.g. `"142"`). |
| `environment` | string | Yes | Non-empty string. Typically `"production"`. |

### device (required)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `platform` | string | Yes | `"ios"` or `"android"`. Server rejects other values. |
| `osVersion` | string | No | OS version string (e.g. `"18.3"`). |
| `locale` | string | No | IETF BCP 47 tag (e.g. `"en-US"`, `"ru-RU"`). |
| `timezone` | string | No | IANA timezone (e.g. `"Europe/Moscow"`, `"America/New_York"`). |

### session (required)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `sessionId` | string | Yes | Generate a unique ID on each cold start (ULID recommended). |
| `userId` | string or null | No | Clerk user ID when authenticated, `null` otherwise. |

### events (required, 1--500 items per request)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `eventId` | string | Yes | Client-generated unique ID per event (ULID recommended). Used for deduplication. |
| `name` | string | Yes | Must be one of the allowed event names listed below. |
| `timestamp` | string | Yes | ISO-8601 UTC timestamp of when the event occurred on device (e.g. `"2026-03-14T12:34:56.789Z"`). |
| `params` | object | Yes | Event-specific payload. Send `{}` for events with no params. Must not be `null`. |

## Response Format

### 200 -- Success

```json
{
  "accepted": true,
  "ingested": 2,
  "failed": 0
}
```

- `ingested` -- number of events stored.
- `failed` -- number of events skipped (duplicate `eventId`). This is normal on retries.

### 400 -- Validation Error

```json
{
  "accepted": false,
  "error": "validation_error",
  "details": [
    "app.name: must be log4fit",
    "events[0].name: is not supported"
  ]
}
```

The `details` array contains per-field error messages. Fix the request and retry.

### 403 -- Forbidden

```json
{
  "error": "forbidden"
}
```

API key is missing or invalid. Check the `X-API-Key` header value.

### 500 -- Server Error

```json
{
  "error": "internal server error"
}
```

Transient server failure. Buffer events locally and retry later.

## Validation Rules

The server rejects the entire batch if any rule is violated (returns 400).

- `app.name` must be `"log4fit"`
- `app.version` must be non-empty
- `app.environment` must be non-empty
- `device.platform` must be `"ios"` or `"android"`
- `session.sessionId` must be non-empty
- `events` must contain 1 to 500 items
- Each `eventId` must be non-empty
- Each `name` must be from the allowed list below
- Each `timestamp` must be non-empty
- Each `params` must be a non-null JSON object (use `{}` for no-param events)
- Unknown top-level fields are rejected (no extra keys in the request body)

## Allowed Event Names

### No-param events (send `params: {}`)

| Name | When to fire |
|------|-------------|
| `return_to_workout_pressed` | User taps the return-to-workout button |
| `create_first_workout` | User creates their first workout |
| `continue_workout_pressed` | User taps continue on an existing workout |
| `create_new_workout` | User creates a new workout |
| `goto_add_skill_pressed` | User navigates to the add-skill screen |
| `increase_repeats_by_button` | User increases reps via the +/- button |
| `decrease_repeats_by_button` | User decreases reps via the +/- button |
| `add_approach_form_open` | User opens the add-approach form |
| `new_skill_form_open` | User opens the new-skill form |

### Parameterized events

---

**`return_to_workout_approved`** -- User confirmed returning to a previous workout.

```json
{ "return_date": "2026-03-10T08:00:00.000Z" }
```

| Param | Type | Notes |
|-------|------|-------|
| `return_date` | string | ISO-8601 date of the workout being returned to. |

---

**`blur_input`** -- User blurred an input field.

```json
{ "name": "repeats", "value": "12" }
```

| Param | Type | Notes |
|-------|------|-------|
| `name` | string | Input field name (e.g. `"repeats"`, `"weight"`). |
| `value` | string | Current input value at blur time. |

---

**`increase_weight_by_button`** / **`decrease_weight_by_button`** -- User changed weight via step button.

```json
{ "step": "5" }
```

| Param | Type | Notes |
|-------|------|-------|
| `step` | string | One of `"1"`, `"2"`, `"5"`, `"10"`. |

---

**`add_approach_form_submit`** -- User submitted the add-approach form.

```json
{ "skill": "Bench Press", "weight": 80, "repeats": 12 }
```

| Param | Type | Notes |
|-------|------|-------|
| `skill` | string | English title of the skill. |
| `weight` | number | Weight value entered. |
| `repeats` | number | Reps value entered. |

---

**`show_info_for_skill`** / **`add_skill_to_workout`** / **`new_skill_form_submit`** -- Skill-related actions.

```json
{ "title": "Bench Press" }
```

| Param | Type | Notes |
|-------|------|-------|
| `title` | string | Skill title (English for existing, user-entered for new). |

---

**`swipe_across_approaches`** / **`change_skill_swipe`** -- Swipe gesture events.

```json
{ "content_offset": "375x0", "content_size": "1125x200", "layout_measurement": "375x200" }
```

| Param | Type | Notes |
|-------|------|-------|
| `content_offset` | string | ScrollView contentOffset as `"XxY"`. |
| `content_size` | string | ScrollView contentSize as `"WxH"`. |
| `layout_measurement` | string | ScrollView layoutMeasurement as `"WxH"`. |

---

**`error_happened`** -- An error was caught in the app. Additional properties beyond those listed are allowed.

```json
{
  "source": "SyncStore.save",
  "message": "Network request failed",
  "name": "TypeError",
  "stack": "TypeError: Network request failed\n    at ...",
  "trace": "at SyncStore.save (SyncStore.ts:42)"
}
```

| Param | Type | Required | Notes |
|-------|------|----------|-------|
| `source` | string | Yes | Code location that caught the error. |
| `message` | string | No | `Error.message` if the caught value was an Error. |
| `name` | string | No | `Error.name` (e.g. `"TypeError"`). |
| `stack` | string | No | `Error.stack` trace. |
| `trace` | string | No | Synthetic stack captured before the async call. |
| `value` | string | No | String coercion of the caught value when it is not an Error. |

---

**`screen_change`** -- Screen navigation event. Currently inactive, reserved for future use.

```json
{ "prevRoute": "HomeScreen", "currRoute": "CurrentWorkoutScreen", "time": 12.5 }
```

| Param | Type | Notes |
|-------|------|-------|
| `prevRoute` | string | Previous screen route name. |
| `currRoute` | string | Current screen route name. |
| `time` | number | Time spent on previous screen in seconds. |

## Implementation Checklist

- [ ] Generate a session ID (ULID) on each cold start; reuse it for the session lifetime
- [ ] Generate a unique event ID (ULID) for each event
- [ ] Collect device info on startup: platform, OS version, locale, timezone
- [ ] Attach Clerk `userId` when authenticated, `null` otherwise
- [ ] Buffer events locally; batch-send periodically or on app background
- [ ] Set `Content-Type: application/json` and `X-API-Key` headers
- [ ] Cap batch size at 500 events per request; split larger buffers
- [ ] On `200`: clear sent events from the local buffer
- [ ] On `400`: log the `details` array; do not retry (fix the payload)
- [ ] On `403`: log and alert; API key is misconfigured
- [ ] On `500` or network error: keep events in buffer and retry with backoff
- [ ] Retries are safe -- duplicate `eventId` values are ignored server-side
