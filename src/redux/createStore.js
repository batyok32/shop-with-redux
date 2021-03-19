import {createStore, applyMiddleware} from "redux";
import logger from "redux-logger";

import roorReducer from "./rootReducer";

export const middlewares =[logger]

export const store = createStore(roorReducer, applyMiddleware(...middlewares))

export default store;