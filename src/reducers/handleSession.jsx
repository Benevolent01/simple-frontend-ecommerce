import { UPDATE_SESSION } from "../actions";

let initialState = {
  token: "",
  is_admin: false,
  username: "",
};

let LOCAL_STORAGE_SESSION = "session";

let localSession = localStorage.getItem(LOCAL_STORAGE_SESSION);

if (localSession) {
  initialState = JSON.parse(localSession);
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SESSION: {
      let updatedState = {
        ...state,
        token: action.token,
        is_admin: action.is_admin,
        username: action.username,
      };
      localStorage.setItem(LOCAL_STORAGE_SESSION, JSON.stringify(updatedState));
      return updatedState;
    }
    default:
      return state;
  }
};
