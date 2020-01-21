import actions from './action'

const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REMOVE_USER:
      return {}
    case actions.UPDATE_USER:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}

export const userFetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.USER_REQUESTED:
      return
    case actions.USER_SUCCESS:
      return [...state, action.payload]
    case actions.USER_FAIL:
      return [...state, action.payload]
    default:
      return state
  }
}