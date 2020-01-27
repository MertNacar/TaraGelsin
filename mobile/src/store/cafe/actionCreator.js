import actions from "./action";

const updateCafe = cafe => {
  return {
    type: actions.UPDATE_CAFE,
    payload: cafe
  };
};

const removeCafe = () => {
  return {
    type: actions.REMOVE_CAFE
  };
};

const successCafe = data => {
  return {
    type: actions.CAFE_SUCCEEDED,
    data
  };
};

const failCafe = error => {
  return {
    type: actions.CAFE_FAILED,
    error
  };
};


export { updateCafe, removeCafe, successCafe, failCafe };
