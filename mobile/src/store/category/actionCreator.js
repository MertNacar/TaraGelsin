import actions from "./action";

const updateCategories = category => {
  return {
    type: actions.UPDATE_CATEGORY,
    payload: category
  };
};
const removeCategories = () => {
  return {
    type: actions.REMOVE_CATEGORY,
  };
};

const successCategories = data => {
  return {
    type: actions.CATEGORY_SUCCEEDED,
    data
  };
};

const failCategories = error => {
  return {
    type: actions.CATEGORY_FAILED,
    error
  };
};

export { updateCategories, removeCategories, successCategories, failCategories };
