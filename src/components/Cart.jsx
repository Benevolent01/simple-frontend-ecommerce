import {} from "react";
import "../styles/Cart.css";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import { removeCartProduct } from "../actions";

const Cart = (props) => {
  const handleRemoveFromCart = (productId) => {
    props.dispatch(removeCartProduct({ id: productId }));
  };

  return (
    <div>
      <Navbar />
      <h2>Your Cart</h2>
      {props.cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {props.cart.map((product) => (
            <li key={product.id} className="cart-product">
              <img src={product.url} alt={product.name} className="product-image" />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>ID: {product.id}</p>
                <p>Quantity: {product.quantity}</p>
                <button onClick={() => handleRemoveFromCart(product.id)}>Remove Item</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

let mapStateToProps = (state) => ({
  cart: state.handleCart.cartProducts,
  currentFilteredProducts: state.handleProducts.products,
});

export default connect(mapStateToProps)(Cart);
