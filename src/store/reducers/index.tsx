import { combineReducers, ReducersMapObject, Reducer } from 'redux'
import reducer1 from './counter1'
import tabbarReducer from './tabbar'
import tokenReducer from './token'
import * as storeState from '../state'

export interface Reducers{
  reducer1: storeState.StoreState1
  tabbarReducer: storeState.Tabbar
  tokenReducer: storeState.StoreToken
}

let reducers: ReducersMapObject = {
  reducer1,
  tabbarReducer,
  tokenReducer
}

export const combineReducer: Reducer<Reducers> = combineReducers<Reducers>(reducers)