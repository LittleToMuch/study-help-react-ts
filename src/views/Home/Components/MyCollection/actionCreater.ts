import {TutsauSearch} from "../../../../store/state";


export const tutsauSearch = (value: TutsauSearch) => {
    return {
        type: 'changeValue',
        payload: value
    }
}

export const backStateLeave = () => {
    return {
        type: 'changeBackState',
        payload: false
    }
}