import actions from './action'

const initialState = {};

export const cafeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REMOVE_CAFE:
      return {}
    case actions.UPDATE_CAFE:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}

export const cafeFetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CAFE_REQUESTED:
      return
    case actions.CAFE_SUCCESS:
      return [...state, action.payload]
    case actions.CAFE_FAIL:
      return [...state, action.payload]
    default:
      return state
  }
}