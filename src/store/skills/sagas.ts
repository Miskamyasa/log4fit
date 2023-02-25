import {takeLeading} from "@redux-saga/core/effects"
import delay from "delay"
import {uniq} from "lodash"
import {call, put, select, takeEvery} from "redux-saga/effects"

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
      const {store, ids}: SkillsReducerState = yield select((state: AppState) => state.skills)

      for (const id of ids.custom) {
        const item = store[id]

        // Английский язык используется как alias для упражнения
        if (item.title.en === title) {
          // TODO: Надо предупредить пользователя о повторе!!!!
          yield put(failFetchSkills())
          return
        }
      }

      const doc = createCustomSkill(title)

      store[doc.id] = doc
      ids.custom = [...ids.custom, doc.id]

      const payload: LoadSkillsAction["payload"] = {
        store,
        ids,
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

      yield call(delay, 3000)

      if (!Array.isArray(snapshot) || snapshot.length === 0) {
        yield put(failFetchSkills())
        return
      }

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
      yield put(failFetchSkills())
    }
  })
}
