import actions from './action'

const initialState = [];

export const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_FOOD:
      return [
        ...state,
        ...action.payload
      ]
    case actions.REMOVE_FOOD:
      return []
    default:
      return state
  }
}
