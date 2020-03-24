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

export interface VideoJson {
    id: number
    category: string
    video_name: string
    video_path: string
    video_intro: string
    video_price: number
    video_pic: string
    adminId: number
    createDate: string
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