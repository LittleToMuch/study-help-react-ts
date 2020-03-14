import { AnyAction } from 'redux'
import { backState } from '../state'
import { changeBackState } from '../types'

const initState: backState = false

export default (state: backState = initState, action: AnyAction): backState => {
    switch (action.type) {
        case changeBackState:
            return action.payload
        default: 
            return state
    }
}