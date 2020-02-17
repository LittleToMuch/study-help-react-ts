import { StoreToken } from '../state'
import { AnyAction } from 'redux'

const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : ""
console.log(userInfo);
const initState: StoreToken = {
    id: userInfo.id,
    username: userInfo.username,
    role: userInfo.role,
    createDate: userInfo.createDate,
    telephone: userInfo.telephone
}

export default function (state: StoreToken = initState, action: AnyAction): StoreToken {
    switch(action.type) {
        case 'update':
            return action.payload
        default:
            return state
    }
}