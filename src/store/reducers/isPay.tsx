import { AnyAction } from 'redux'
import { IsPay } from '../state'
import { ISPAY, NOPAY } from '../types'

const initState: IsPay = false

export default (state: IsPay = initState, action: AnyAction): IsPay => {
    switch (action.type) {
        case ISPAY:
            return action.payload
        case NOPAY:
            return action.payload
        default:
            return state
    }
}

