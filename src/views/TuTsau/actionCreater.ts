import { TutsauSearch } from '../../store/state'

export const tutsauSearch = (value: TutsauSearch) => {
    return {
        type: 'changeValue',
        payload: value
    }
}