import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { userReducer } from "./user/reducer";
import { foodReducer } from "./food/reducer";
import { categoryReducer } from "./category/reducer";
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from 'redux-logger'
import rootSaga from './index'

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
  foods: foodReducer
});

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware, logger)))

  sagaMiddleware.run(rootSaga)
  return store
}

export default configureStore;
