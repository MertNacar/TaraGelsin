import actions from './action'

const initialState = [];

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_CATEGORY:
      return [
        ...state,
        ...action.payload
      ]
    case actions.REMOVE_CATEGORY:
      return []
    default:
      return state
  }
}
