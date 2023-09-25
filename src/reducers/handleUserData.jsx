import { UPDATE_USER_EDIT_PROFILE, UPDATE_USER_FETCH_USERS, UPDATE_USER_INFO, UPDATE_USER_ORDERS } from "../actions";

let initialState = {
  data: null,
};

let initialState2 = {};

let initialState3 = {
  orders: null,
};

let initialState4 = {
  users: null,
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

const handleFetchUsers = (state = initialState4, action) => {
  switch (action.type) {
    case UPDATE_USER_FETCH_USERS:
      return { ...state, users: action.users };
    default:
      return state;
  }
};

const handleUserOrders = (state = initialState3, action) => {
  switch (action.type) {
    case UPDATE_USER_ORDERS:
      return { ...state, orders: action.orders };
    default:
      return state;
  }
};

export { handleUserInfo, handleEditUserInfo, handleFetchUsers, handleUserOrders };
