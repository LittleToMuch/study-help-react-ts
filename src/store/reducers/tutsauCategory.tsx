import { AnyAction } from 'redux'
import { TutsauCategory } from '../state/index'

const initState: TutsauCategory[] = [
    {label: 'React', value: 'react'},
    {label: 'Golang', value: 'golang'},
    {label: 'Java', value: 'java'},
    {label: 'Swift', value: 'swift'},
    {label: 'Python', value: 'python'},
    {label: 'Rust', value: 'rust'},
    {label: 'PHP', value: 'php'},
    {label: 'Ruby', value: 'ruby'}
]

export default function (state: TutsauCategory[] = initState, action: AnyAction): TutsauCategory[] {
    switch(action.type) {
        default: 
            return state
    }
}
