import {__create} from "../../helpers/i18n"
import {idGenerator} from "../../helpers/idGenerator"

import type {Skill} from "./types"

export function createCustomSkill(title: string): Skill {
    return {
        id: idGenerator(),
        title: __create(title),
        category: "custom",
        icon: "",
        description: __create(""),
        image: "",
    }
}
