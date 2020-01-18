import actions from './action'

const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REMOVE_USER:
      return {}
    case actions.UPDATE_USER:
      return Object.assign({}, ...state, ...action.payload)
    default:
      return state
  }
}
