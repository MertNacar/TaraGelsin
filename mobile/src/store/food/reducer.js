import actions from './action'

const initialState = [];

export const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_FOOD:
      return [
        ...state,
        action.payload
      ]
    default:
      return state
  }
}
