import { GET_PRODUCTS, UPDATE_PRODUCTS, UPDATE_PRODUCTS_VERSION } from "../actions";

export let LOCAL_FETCHED_PRODUCTS = "fetchedProducts";
let LOCAL_FILTERED_LENGTH = "filteredLength";
export let LOCAL_PRODUCTS_VERSION = "productsVersion";

let initialState = {
  fetchedProducts: {
    data: [],
    productsVersion: 0,
  },
  products: [],
  currentlyFilteredLength: 0,
  productsVersion: 0,
};

let localFetchedProducts = localStorage.getItem(LOCAL_FETCHED_PRODUCTS);
let localFilteredLength = localStorage.getItem(LOCAL_FILTERED_LENGTH);
let localProductsVersion = localStorage.getItem(LOCAL_PRODUCTS_VERSION);

if (localFetchedProducts) {
  initialState.fetchedProducts = JSON.parse(localFetchedProducts);
}

if (localFilteredLength) {
  initialState.currentlyFilteredLength = JSON.parse(localFilteredLength);
}

if (localProductsVersion) {
  initialState.productsVersion = parseInt(localProductsVersion);
  // initialState.fetchedProducts.productsVersion = initialState.productsVersion;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      if (state.fetchedProducts.productsVersion !== state.productsVersion) {
        let updatedState = {
          ...state,
          fetchedProducts: {
            data: action.products,
            productsVersion: state.productsVersion,
          },
        };
        localStorage.setItem(LOCAL_FETCHED_PRODUCTS, JSON.stringify(updatedState.fetchedProducts));
        localStorage.setItem(LOCAL_PRODUCTS_VERSION, updatedState.productsVersion.toString());
        return updatedState;
      }
      let updatedState2 = { ...state, fetchProducts: { ...state.fetchedProducts, data: action.products } };
      localStorage.setItem(LOCAL_FETCHED_PRODUCTS, JSON.stringify(updatedState2.fetchProducts));
      localStorage.setItem(LOCAL_PRODUCTS_VERSION, updatedState2.productsVersion.toString());
      return updatedState2;
    }
    case UPDATE_PRODUCTS: {
      let updatedState = { ...state, products: action.products, currentlyFilteredLength: action.products.length };
      localStorage.setItem(LOCAL_FILTERED_LENGTH, action.products.length);
      return updatedState;
    }
    case UPDATE_PRODUCTS_VERSION: {
      let updatedState = { ...state, productsVersion: state.productsVersion + 1 };
      localStorage.setItem(LOCAL_PRODUCTS_VERSION, updatedState.productsVersion.toString());
      return updatedState;
    }
    default:
      return state;
  }
};
