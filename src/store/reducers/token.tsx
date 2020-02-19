import { StoreToken } from '../state'
import { AnyAction } from 'redux'

const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : ""

const initState: StoreToken = {
    id: userInfo.id,
    username: userInfo.username,
    role: userInfo.role,
    createDate: userInfo.createDate,
    telephone: userInfo.telephone,
    avatar: userInfo.avatar,
    password: userInfo.password
}

export default function (state: StoreToken = initState, action: AnyAction): StoreToken | null {
    switch(action.type) {
        case 'update':
            return action.payload
        case 'setAvatar':
            return {...state, avatar: action.payload.avatar}
        case 'clearToken':
            return null
        default:
            return state
    }
}