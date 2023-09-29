import { UPDATE_USER_EDIT_PROFILE, UPDATE_USER_INFO } from "../actions";

let initialState = {
  data: null,
};

let initialState2 = {};

let initialState3 = {
  users: null,
};

let initialState4 = {
  orders: null,
};

const handleUserInfo = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return { ...state, data: action.data };
    default:
      return state;
  }
};

const handleEditUserInfo = (state = initialState2, action) => {
  switch (action.type) {
    case UPDATE_USER_EDIT_PROFILE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export { handleUserInfo, handleEditUserInfo };
