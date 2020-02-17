import { createStore, applyMiddleware, Store, StoreEnhancer, StoreEnhancerStoreCreator, compose } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { combineReducer } from "./reducers";

// const storeEnhancer: StoreEnhancer  = applyMiddleware(thunk)
const storeEnhancer: StoreEnhancer = composeWithDevTools(applyMiddleware(thunk))
const storeEnhancerStoreCreator: StoreEnhancerStoreCreator = storeEnhancer(createStore)
const store: Store = storeEnhancerStoreCreator(combineReducer)

export default store;
