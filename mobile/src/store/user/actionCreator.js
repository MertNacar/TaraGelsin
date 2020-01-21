import actions from "./action";

const updateUser = user => {
  return {
    type: actions.UPDATE_USER,
    payload: user
  };
};

const removeUser = () => {
  return {
    type: actions.REMOVE_USER
  };
};

const successUser = data => {
  return {
    type: actions.USER_SUCCEEDED,
    data
  };
};

const failUser = error => {
  return {
    type: actions.USER_FAILED,
    error
  };
};


export { updateUser, removeUser, successUser, failUser };
