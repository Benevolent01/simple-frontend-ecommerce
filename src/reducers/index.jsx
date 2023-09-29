import { combineReducers } from "redux";
import handleProducts from "./handleProducts";
import handleCategories from "./handleCategories";
import handleCart from "./handleCart";
import { handleRegister, handleLogin } from "./handleOnboarding";
import handleSession from "./handleSession";
import { handleUserInfo, handleEditUserInfo } from "./handleUserData";

const mainReducer = combineReducers({
  handleProducts,
  handleCategories,
  handleCart,
  handleRegister,
  handleLogin,
  handleSession,
  handleUserInfo,
  handleEditUserInfo,
});

export default mainReducer;
