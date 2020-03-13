export interface StoreState1 {
    languageName: string
    enthusiamLevel: number
}

export type Tabbar = boolean

export interface StoreToken {
    id: number
    username: string
    role: number
    createDate: string
    telephone: string
    avatar: string
    password: string
}

export interface SetAvatar {
    avatar: string
}

export interface TutsauCategory {
    label: string
    value: string
}

export interface ArticleCategory {
    label: string
    value: string
}

export enum ArticleCategoryEnum {
    experience,
    learning
}

export type TutsauSearch = string