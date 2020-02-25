import { AnyAction } from 'redux'
import { TutsauSearch } from '../state'
import { changeValue } from '../types'

const initState: TutsauSearch = ''

export default (state: TutsauSearch = initState, action: AnyAction): TutsauSearch => {
    switch (action.type) {
        case changeValue:
            return action.payload
        default: 
            return state
    }
}