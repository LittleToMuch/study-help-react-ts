import { combineReducers, ReducersMapObject, Reducer } from 'redux'
import reducer1 from './counter1'
import tabbarReducer from './tabbar'
import tokenReducer from './token'
import tutsauCategory from './tutsauCategory'
import tutsauSearch from './tutsauSearch'
import articleCategory from './articleCategory'
import * as storeState from '../state'

export interface Reducers{
  reducer1: storeState.StoreState1
  tabbarReducer: storeState.Tabbar
  tokenReducer: storeState.StoreToken
  tutsauCategory: storeState.TutsauCategory
  tutsauSearch: storeState.TutsauSearch
  articleCategory: storeState.ArticleCategory
}

let reducers: ReducersMapObject = {
  reducer1,
  tabbarReducer,
  tokenReducer,
  tutsauCategory,
  tutsauSearch,
  articleCategory
}

export const combineReducer: Reducer<Reducers> = combineReducers<Reducers>(reducers)