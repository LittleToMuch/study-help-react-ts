import { Tabbar } from '../../../store/state'

export const hideTabbar = () => {
    return {
        type: 'hide',
        payload: false
    }
}

export const showTabbar = () => {
    return {
        type: 'show',
        payload: true
    }
}