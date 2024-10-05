import {Skill} from "../skills/types"

export type WeightSteps = 1 | 2 | 5 | 10

export type WeightSettings = Record<Skill["id"], WeightSteps>
