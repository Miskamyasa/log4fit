import {type Locales} from "../../helpers/i18n"

export type Categories = "custom" | "other" | "base"

export type Skill = {
    id: string
    category: Categories
    icon: string
    title: Record<Locales, string>
    description: Record<Locales, string>
    image: string
}

export type Skills = Record<Categories, Array<Skill["id"]>>
