import { createStore, combineReducers } from "redux";
import { userReducer } from "./user/reducer";
const rootReducer = combineReducers({
  user: userReducer,
});

let store = createStore(rootReducer);

export default store;
