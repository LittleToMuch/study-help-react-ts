import { combineReducers, ReducersMapObject, Reducer } from 'redux'
import reducer1 from './counter1'
import tabbarReducer from './tabbar'
import tokenReducer from './token'
import tutsauCategory from './tutsauCategory'
import articleCategory from './articleCategory'
import tutsauSearch from './tutsauSearch'
import backState from './backState'
import isPay from './isPay'
import * as storeState from '../state'

export interface Reducers{
  reducer1: storeState.StoreState1
  tabbarReducer: storeState.Tabbar
  tokenReducer: storeState.StoreToken
  tutsauCategory: storeState.TutsauCategory
  tutsauSearch: storeState.TutsauSearch
  articleCategory: storeState.ArticleCategory
  backState: storeState.backState
  isPay: storeState.IsPay
}

let reducers: ReducersMapObject = {
  reducer1,
  tabbarReducer,
  tokenReducer,
  tutsauCategory,
  tutsauSearch,
  articleCategory,
  backState,
  isPay
}

export const combineReducer: Reducer<Reducers> = combineReducers<Reducers>(reducers)