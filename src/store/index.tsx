import { createStore, applyMiddleware, Store, StoreEnhancer, StoreEnhancerStoreCreator } from "redux";
import thunk from 'redux-thunk'
import { combineReducer } from "./reducers";

const storeEnhancer: StoreEnhancer  = applyMiddleware(thunk)
const storeEnhancerStoreCreator: StoreEnhancerStoreCreator = storeEnhancer(createStore)
const store: Store = storeEnhancerStoreCreator(combineReducer)

export default store;
