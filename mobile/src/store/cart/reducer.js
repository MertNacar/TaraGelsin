import actions from './action'

const initialState = [];

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_CART:
      return [
        ...state,
        ...action.payload
      ]
    case actions.REMOVE_CART:
      return []
    default:
      return state
  }
}
