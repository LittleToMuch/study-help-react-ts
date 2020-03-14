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

export const backStateEnter = () => {
    return {
        type: 'changeBackState',
        payload: true
    }
}

