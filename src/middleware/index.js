import logger from "./logger";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

/*
Exports logger and Redux thunk. 
Redux Thunk lets you call action creators that return a function instead of an action object. 
*/
export default applyMiddleware(thunk, logger);
