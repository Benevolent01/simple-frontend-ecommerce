import { ADD_CART_PRODUCT, REMOVE_CART_PRODUCT } from "../actions";

let LOCAL_FETCHED_CART_PRODUCTS = "cartProducts";

let initialState = {
  cartProducts: [],
};

const localCartProducts = localStorage.getItem(LOCAL_FETCHED_CART_PRODUCTS);

if (localCartProducts) {
  initialState.cartProducts = JSON.parse(localCartProducts);
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART_PRODUCT: {
      const { id, quantity } = action.product;
      const existingItem = state.cartProducts.find((product) => product.id === id);
      if (!existingItem) {
        const updatedCart = {
          ...state,
          cartProducts: [...state.cartProducts, action.product],
        };
        // Update local storage
        localStorage.setItem(LOCAL_FETCHED_CART_PRODUCTS, JSON.stringify(updatedCart.cartProducts));
        return updatedCart;
      }
      const updatedCart = {
        ...state,
        cartProducts: state.cartProducts.map((product) => {
          if (product.id === id) {
            return { ...product, quantity: product.quantity + quantity };
          }
          return product;
        }),
      };
      // Update local storage
      localStorage.setItem(LOCAL_FETCHED_CART_PRODUCTS, JSON.stringify(updatedCart.cartProducts));
      return updatedCart;
    }
    case REMOVE_CART_PRODUCT: {
      const { id } = action.product;
      const updatedCart = {
        ...state,
        cartProducts: state.cartProducts
          .map((product) => {
            if (product.id === id) {
              const newQuan = product.quantity - 1;
              return newQuan <= 0 ? null : { ...product, quantity: newQuan };
            }
            return product;
          })
          .filter(Boolean),
      };
      // Update local storage
      localStorage.setItem(LOCAL_FETCHED_CART_PRODUCTS, JSON.stringify(updatedCart.cartProducts));
      return updatedCart;
    }
    default:
      return state;
  }
};
