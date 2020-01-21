import actions from './action'

const initialState = [];

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_CATEGORY:
      return [
        ...state,
        action.payload
      ]
    default:
      return state
  }
}
