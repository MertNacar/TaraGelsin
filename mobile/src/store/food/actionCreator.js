import actions from "./action";

const updateFoods = food => {
  return {
    type: actions.UPDATE_FOOD,
    payload: food
  };
};

const removeFoods = () => {
  return {
    type: actions.REMOVE_FOOD,
  };
};

const successFoods = data => {
  return {
    type: actions.FOOD_SUCCEEDED,
    data
  };
};

const failFoods = error => {
  return {
    type: actions.FOOD_FAILED,
    error
  };
};

export { updateFoods, removeFoods, successFoods, failFoods };
