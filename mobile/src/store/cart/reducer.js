import actions from './action'

const initialState = [];
let index = null

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_CART:
      index = state.findIndex(item => item.foodID === action.payload.foodID)
      if (index === -1) {
        return [
          ...state,
          action.payload
        ]
      } else {
        state[index].quantity += action.payload.quantity
        return state
      }

    case actions.REMOVE_ITEM:
      index = state.findIndex(item => item.foodID === action.payload.foodID)
      if (state[index].quantity === 1) {
        state.splice(index, 1)
      } else {
        state[index].quantity -= 1
      }
      return state

    case actions.REMOVE_CART:
      return []

    default:
      return state
  }
}
