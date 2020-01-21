import { takeLatest, call, put, all } from 'redux-saga/effects'
import { successUser, failUser } from './user/actionCreator'
import { successCategory, failCategory } from './category/actionCreator'
import { successFood, failFood } from './food/actionCreator'
import userAction from './user/action'
import categoryAction from './category/action'
import foodAction from './food/action'
import * as Http from '../utils/httpHelper'

export function* fetchUser(action) {
  try {
    const data = yield call(Http.getWithoutToken(action.payload.endpoint))
    yield put(successUser(data))
  } catch (err) {
    yield put(failUser(err))
  }
}

export function* fetchCategory(action) {
  try {
    const data = yield call(Http.get, action.payload.url)
    yield put(successCategory(data))
  } catch (err) {
    yield put(failCategory(err))
  }
}

export function* fetchFoods(action) {
  try {
    const data = yield call(Http.get, action.payload.url)
    yield put(successFood(data))
  } catch (err) {
    yield put(failFood(err))
  }
}

function* watchUser() {
  takeLatest(userAction.USER_REQUESTED, fetchUser)
}

function* watchCategories() {
  takeLatest(categoryAction.CATEGORY_REQUESTED, fetchCategory)
}

function* watchFoods() {
  takeLatest(foodAction.FOOD_REQUESTED, fetchFoods)
}

export default function* rootSaga() {
  yield all([
    watchUser(),
    watchCategories(),
    watchFoods()
  ])
}