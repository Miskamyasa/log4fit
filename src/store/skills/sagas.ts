import {takeLeading} from "@redux-saga/core/effects"
import {uniq} from "lodash"
import {put, select, takeEvery} from "redux-saga/effects"

import ErrorHandler from "../../helpers/ErrorHandler"
import idGenerator from "../../helpers/idGenerator"
import {__create} from "../../i18"
import skills from "../../json/skills.json"
import {AppState, SagaGenerator} from "../types"

import {failFetchSkills, loadSkills} from "./actions"
import {AddCustomSkillAction, Skill, SkillsReducerState, LoadSkillsAction} from "./types"


function createCustomSkill(title: string): Skill {
  return {
    id: idGenerator(),
    title: __create(title),
    category: "custom",
    icon: "",
    description: __create(""),
    image: "",
  }
}

export function* watchAddCustomSkill(): SagaGenerator {
  yield takeEvery("AddCustomSkill", function* addCustomSkillEffect({payload: title}: AddCustomSkillAction) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {store, ids}: SkillsReducerState = yield select((state: AppState) => state.skills)

      for (const id of ids.custom) {
        const item = store[id]

        // FIXME: надо разобраться почему EN. Тут скорее всего защита от повторного названия.
        //  Надо предупредить пользователя о повторе!!!!

        if (item.title.en === title) {
          yield put(failFetchSkills())
          return
        }
      }

      const doc = createCustomSkill(title)

      store[doc.id] = doc
      ids.custom.push(doc.id)

      const payload: LoadSkillsAction["payload"] = {
        store,
        ids: {
          ...ids,
          custom: uniq(ids.custom),
        },
      }

      yield put(loadSkills(payload))

    } catch (e) {
      ErrorHandler(e)
    }
  })
}

export function* watchFetchSkills(): SagaGenerator {
  yield takeLeading("FetchSkills", function* fetchSkillsEffect() {
    try {
      const snapshot: Skill[] = skills as Skill[]

      if (!Array.isArray(snapshot) || snapshot.length === 0) {
        yield put(failFetchSkills())
        return
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {store, ids}: SkillsReducerState = yield select((state: AppState) => state.skills)

      for (const doc of snapshot) {
        const {id, category} = doc
        store[id] = doc
        ids[category].push(id)
      }

      const payload: LoadSkillsAction["payload"] = {
        store,
        ids: {
          custom: ids.custom,
          other: uniq(ids.other),
          base: uniq(ids.base),
        },
      }

      yield put(loadSkills(payload))

    } catch (e) {
      ErrorHandler(e)
    }
  })
}