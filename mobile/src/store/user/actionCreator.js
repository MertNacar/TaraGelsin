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

export { updateUser, removeUser };
