import {TutsauSearch} from "../../../../store/state";

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

export const tutsauSearch = (value: TutsauSearch) => {
    return {
        type: 'changeValue',
        payload: value
    }
}