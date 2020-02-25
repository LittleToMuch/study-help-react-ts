export interface LearningStrategyJson {
    id?: string | number
    title: string
    content: string
    createDate: string
    category: string
    pic: string
    userid?: string
}

export interface ExperienceJson {
    id?: string | number
    title: string
    content: string
    createDate: string
    category: string
    pic: string
    userid?: string
}

export interface TuTsauJson {
    id: string | number
    title: string
    content: string
    createTime: string
    userid?: string
}

export interface VideoJson {
    id: string | number
    category: string
    video_name: string
    video_path: string
    video_intro: string
    video_price: string | number
    adminId?: string | number
}

export interface ContentListJson {
    id: number
    userid?: number
    title: string
    content: string
    createDate: string
    category: string
    pic: string
}