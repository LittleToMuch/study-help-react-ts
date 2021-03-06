export interface User {
    _id: string
    username: string
}

export interface UserListResponse {
    code: number,
    data: User[]
}

export interface TuTsauJson {
    id: number
    title: string
    content: string
    createDate: string
    category: string
    pic: string
    userid?: string
}

export interface ArticleJson {
    id: number
    title: string
    content: string
    createDate: string
    category: string
    pic: string
    userid?: number
}

export interface Data {
    experienceid: number
}

export interface LikeList {
    id: number
    userid: number
    experienceid?: number
    learningstrategyid?: number
    createDate: string
    title: string
    content: string
    category: string
    pic: string
}