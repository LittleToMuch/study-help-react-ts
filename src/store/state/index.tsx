export interface StoreState1 {
    languageName: string
    enthusiamLevel: number
}

export type Header = boolean

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