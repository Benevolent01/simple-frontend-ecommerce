import { useEffect } from "react";
import { updateProducts, getProducts, addCartProduct } from "../actions";
import { API_HOST, currency } from "../config";
import "../styles/ProductsTable.css";
import { connect } from "react-redux";
import customImage from "../assets/watch.jpg";
import PnotFound from "../assets/productsNotFound.png";

const ProductsTable = (props) => {
  const updateAllProducts = async () => {
    let r = await fetch(`${API_HOST}/viewProducts`);
    let data = await r.json();
    // update all products
    props.dispatch(getProducts(data));
    // populate
    props.dispatch(updateProducts(data));
  };

  useEffect(() => {
    updateAllProducts();
  }, []);

  const handleAddToCart = (product) => {
    props.dispatch(addCartProduct({ ...product, quantity: 1 }));
  };

  return (
    <>
      <div className="outer-div">
        <div className="prod-wrapper">
          {props.products.length ? (
            props.products.map((product) => (
              <div key={product.id} className="product-main">
                <img className="fix-prod-img" alt={"Product image"} src={product.url || customImage}></img>
                <div className="product-rest">
                  <div className="product-name">
                    <h3>
                      {product.name} ({product.id})
                    </h3>
                  </div>
                  <div className="product-price">
                    <h4>
                      {currency}
                      {product.price.toLocaleString("el-GR")}
                    </h4>
                  </div>
                  <div className="product-button">
                    <button onClick={() => handleAddToCart(product)}>ADD TO CART</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="P-404">
                <img src={PnotFound} />
                <h2>There are no products currently...</h2>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

let mapStateToProps = (state) => ({
  showProducts: state.handleProducts.fetchedProducts,
  products: state.handleProducts.products,
});

export default connect(mapStateToProps)(ProductsTable);
