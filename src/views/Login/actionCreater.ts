import { StoreToken } from '../../store/state'
export const updateToken = (params: StoreToken) => {
    return {
        type: 'update',
        payload: {
            id: params.id,
            username: params.username,
            role: params.role,
            createDate: params.createDate,
            telephone: params.telephone
        }
    }
}