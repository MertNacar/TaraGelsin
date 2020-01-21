import actions from "./action";

const getFood = user => {
  return {
    type: actions.GET_FOOD,
    payload: user
  };
};

const successFood = data => {
  return {
    type: actions.FOOD_SUCCEEDED,
    data
  };
};

const failFood = error => {
  return {
    type: actions.FOOD_FAILED,
    error
  };
};

export { getFood, successFood, failFood };
