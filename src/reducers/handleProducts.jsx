import { GET_PRODUCTS, UPDATE_PRODUCTS } from "../actions";

let LOCAL_FETCHED_PRODUCTS = "fetchedProducts";
let LOCAL_FILTERED_LENGTH = "filteredLength";

let initialState = {
  fetchedProducts: [],
  currentlyFilteredLength: 0,
  products: [],
};

let localFetchedProducts = localStorage.getItem(LOCAL_FETCHED_PRODUCTS);
let localFilteredLength = localStorage.getItem(LOCAL_FILTERED_LENGTH);

if (localFetchedProducts) {
  initialState.fetchedProducts = JSON.parse(localFetchedProducts);
}

if (localFilteredLength) {
  initialState.currentlyFilteredLength = JSON.parse(localFilteredLength);
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      let updatedState = { ...state, fetchedProducts: action.products };
      localStorage.setItem(LOCAL_FETCHED_PRODUCTS, JSON.stringify(updatedState.fetchedProducts));
      return updatedState;
    }
    case UPDATE_PRODUCTS: {
      let updatedState = { ...state, products: action.products, currentlyFilteredLength: action.products.length };
      localStorage.setItem(LOCAL_FILTERED_LENGTH, action.products.length);
      return updatedState;
    }
    default:
      return state;
  }
};
