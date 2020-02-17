import * as constants from '../types'

export interface IncrementEnthusiasm {
    type: constants.INCREMENT_ENTHUSIASM
}

export interface DecrementEnthusiasm {
    type: constants.DECREMENT_ENTHUSIASM
}

export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm

export function IncrementEnthusiasm(): IncrementEnthusiasm {
    return {
        type: constants.INCREMENT_ENTHUSIASM
    }
}

export function decrementEnthusiasm(): DecrementEnthusiasm {
    return {
        type: constants.DECREMENT_ENTHUSIASM
    }
}