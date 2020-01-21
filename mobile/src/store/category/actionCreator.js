import actions from "./action";

const getCategory = user => {
  return {
    type: actions.GET_CATEGORY,
    payload: user
  };
};

const successCategory = data => {
  return {
    type: actions.CATEGORY_SUCCEEDED,
    data
  };
};

const failCategory = error => {
  return {
    type: actions.CATEGORY_FAILED,
    error
  };
};

export { getCategory, successCategory, failCategory };
