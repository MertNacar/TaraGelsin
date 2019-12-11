import { createStore, combineReducers } from "redux";
import * as reducers from "./index";
const rootReducer = combineReducers({

});

let store = createStore(rootReducer);

export default store;
