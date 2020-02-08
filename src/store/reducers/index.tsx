import { combineReducers, ReducersMapObject, Reducer } from 'redux'
import reducer1 from './counter1'
import reducer2 from './counter2'
import * as storeState from '../types'

export interface Reducers{
  reducer1: storeState.StoreState1
  reducer2: storeState.StoreState2
}

let reducers: ReducersMapObject = {
  reducer1,
  reducer2
}

export const combineReducer: Reducer<Reducers> = combineReducers<Reducers>(reducers)