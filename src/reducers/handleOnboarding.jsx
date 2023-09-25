import { UPDATE_LOGIN_NAME, UPDATE_LOGIN_PASSWORD, UPDATE_REGISTER_NAME, UPDATE_REGISTER_PASSWORD } from "../actions";

let initialRegisterState = {
  name: "",
  password: "",
};

let initialLoginState = {
  name: "",
  password: "",
};

const handleRegister = (state = initialRegisterState, action) => {
  switch (action.type) {
    case UPDATE_REGISTER_NAME:
      return { ...state, name: action.name };
    case UPDATE_REGISTER_PASSWORD:
      return { ...state, password: action.password };
    default:
      return state;
  }
};

const handleLogin = (state = initialLoginState, action) => {
  switch (action.type) {
    case UPDATE_LOGIN_NAME:
      return { ...state, name: action.name };
    case UPDATE_LOGIN_PASSWORD:
      return { ...state, password: action.password };
    default:
      return state;
  }
};

export { handleRegister, handleLogin };
