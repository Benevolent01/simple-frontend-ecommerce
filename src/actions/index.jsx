// TERMINOLOGY: Products, Categories, CartProducts

export let GET_PRODUCTS = "GET_PRODUCTS";
export let UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
export let GET_CATEGORIES = "GET_CATEGORIES";
export let ADD_CATEGORY = "ADD_CATEGORY";
export let REMOVE_CATEGORY = "REMOVE_CATEGORY";
export let ADD_CART_PRODUCT = "ADD_CART_PRODUCT";
export let REMOVE_CART_PRODUCT = "REMOVE_CART_PRODUCT";
export let UPDATE_REGISTER_NAME = "UPDATE_REGISTER_NAME";
export let UPDATE_REGISTER_PASSWORD = "UPDATE_REGISTER_PASSWORD";
export let UPDATE_LOGIN_NAME = "UPDATE_LOGIN_NAME";
export let UPDATE_LOGIN_PASSWORD = "UPDATE_LOGIN_PASSWORD";
export let UPDATE_SESSION = "UPDATE_SESSION";
export let UPDATE_USER_INFO = "UPDATE_USER_INFO";
export let UPDATE_USER_EDIT_PROFILE = "UPDATE_USER_EDIT_PROFILE";
export let UPDATE_USER_FETCH_USERS = "UPDATE_USER_FETCH_USERS";
export let UPDATE_USER_ORDERS = "UPDATE_USER_ORDERS";
export let UPDATE_PRODUCTS_VERSION = "UPDATE_PRODUCTS_VERSION";

export let getProducts = (value) => ({ type: GET_PRODUCTS, products: value });
export let updateProducts = (value) => ({ type: UPDATE_PRODUCTS, products: value });

export let getCategories = (value) => ({ type: GET_CATEGORIES, categories: value });
export let addCategory = (value) => ({ type: ADD_CATEGORY, category: value });
export let removeCategory = (value) => ({ type: REMOVE_CATEGORY, category: value });

export let addCartProduct = (value) => ({ type: ADD_CART_PRODUCT, product: value });
export let removeCartProduct = (value) => ({ type: REMOVE_CART_PRODUCT, product: value });

export let updateRegisterName = (value) => ({ type: UPDATE_REGISTER_NAME, name: value });
export let updateRegisterPassword = (value) => ({ type: UPDATE_REGISTER_PASSWORD, password: value });
export let updateLoginName = (value) => ({ type: UPDATE_LOGIN_NAME, name: value });
export let updateLoginPassword = (value) => ({ type: UPDATE_LOGIN_PASSWORD, password: value });

export let updateSession = (value1, value2, value3) => ({ type: UPDATE_SESSION, token: value1, is_admin: value2, username: value3 });

export let updateUserInfo = (value) => ({ type: UPDATE_USER_INFO, data: value });
export let updateUserEditProfile = (key, value) => ({ type: UPDATE_USER_EDIT_PROFILE, payload: { [key]: value } });
export let updateProductsVersion = () => ({ type: UPDATE_PRODUCTS_VERSION });

export let updateFetchUsers = (value) => ({ type: UPDATE_USER_FETCH_USERS, users: value });
export let updateUserOrders = (value) => ({ type: UPDATE_USER_ORDERS, orders: value });
