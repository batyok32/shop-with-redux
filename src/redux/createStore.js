import {createStore, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import roorReducer from "./rootReducer";

export const middlewares =[thunk, logger]

export const store = createStore(roorReducer, applyMiddleware(...middlewares))

export default store;