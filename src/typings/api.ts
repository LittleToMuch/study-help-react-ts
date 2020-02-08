export interface User {
    _id: string
    username: string
}

export interface UserListResponse {
    code: number,
    data: User[]
}