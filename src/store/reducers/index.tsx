import { combineReducers, ReducersMapObject, Reducer } from 'redux'
import reducer1 from './counter1'
import reducer2 from './header'
import tokenReducer from './token'
import * as storeState from '../state'

export interface Reducers{
  reducer1: storeState.StoreState1
  reducer2: storeState.Header
  tokenReducer: storeState.StoreToken
}

let reducers: ReducersMapObject = {
  reducer1,
  reducer2,
  tokenReducer
}

export const combineReducer: Reducer<Reducers> = combineReducers<Reducers>(reducers)