export const isPay = () => {
    return {
        type: 'ISPAY',
        payload: true
    }
}

export const noPay = () => {
    return {
        type: 'NOPAY',
        payload: false
    }
}