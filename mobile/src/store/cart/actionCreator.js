import actions from "./action";

const updateCart = food => {
  return {
    type: actions.UPDATE_CART,
    payload: food
  };
};

const removeCart = () => {
  return {
    type: actions.REMOVE_CART,
  };
};

const removeItem = foodID => {
  return {
    type: actions.REMOVE_ITEM,
    payload: { foodID }
  };
};

const successCart = data => {
  return {
    type: actions.CART_SUCCEEDED,
    data
  };
};

const failCart = error => {
  return {
    type: actions.CART_FAILED,
    error
  };
};

export { updateCart, removeCart, removeItem, successCart, failCart };
