import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { API_HOST, currency } from "../config";

const ManageProducts = (props) => {
  const [products, setProducts] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", categories: [], url: "" });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState({ name: "", price: "", categories: [], url: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchAvailableCategories();
  }, []);

  // useEffect(() => {
  //   console.log(editProduct.categories);
  // }, [editProduct]);

  // Initially fetch categories (is not much needed)
  const fetchAvailableCategories = async () => {
    try {
      const r = await fetch(`${API_HOST}/viewCategories`, {
        method: "GET",
      });
      if (!r.ok) {
        throw new Error(`Error fetching available categories: ${r.statusText}`);
      }
      const data = await r.json();
      setAvailableCategories(data);
    } catch (error) {
      console.error("Error fetching available categories:", error);
      setError(error.message || "An error occurred while fetching available categories.");
    }
  };

  // Fetch all products to edit
  const fetchProducts = async () => {
    try {
      const r = await fetch(`${API_HOST}/viewProducts`, {
        method: "GET",
      });
      if (!r.ok) {
        throw new Error(`Error fetching products: ${r.statusText}`);
      }
      const data = await r.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message || "An error occurred while fetching products.");
    }
  };

  // Update state to handle editProduct/selectedProduct
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setEditProduct({ ...product });
  };

  // Edit function, trim input, PUT request & display update
  const handleSaveProduct = async () => {
    try {
      editProduct.categories = editProduct.categories.map((category) => category.trim());

      if (!editProduct.name.trim() || !editProduct.price) {
        throw new Error("Name, price, and URL are required fields.");
      }

      const r = await fetch(`${API_HOST}/editProduct/${selectedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${props.session.token}`,
        },
        body: JSON.stringify({ ...editProduct }),
      });

      if (!r.ok) {
        throw new Error(`Error updating product: ${r.statusText}`);
      }

      await fetchProducts();
      setSelectedProduct(null);
      setError(null);
    } catch (error) {
      console.error("Error updating product:", error);
      setError(error.message || "An error occurred while updating the product.");
    }
  };

  // Edit categories with checkboxes functionality
  const handleEditProductCategoryChange = (categoryName, isChecked) => {
    let newCategories = [...editProduct.categories];
    if (isChecked) {
      newCategories.push(categoryName);
    } else {
      newCategories = newCategories.filter((cat) => cat !== categoryName);
    }
    setEditProduct({ ...editProduct, categories: newCategories });
  };

  // Delete function & display update
  const handleDeleteProduct = async () => {
    try {
      const r = await fetch(`${API_HOST}/deleteProduct/${selectedProduct.id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${props.session.token}`,
        },
      });

      if (!r.ok) {
        throw new Error(`Error deleting product: ${r.statusText}`);
      }

      await fetchProducts();
      setSelectedProduct(null);
      setError(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      setError(error.message || "An error occurred while deleting the product.");
    }
  };

  // Create function, trim input, POST request and display update
  const handleCreateProduct = async () => {
    try {
      newProduct.categories = newProduct.categories.map((category) => category.trim());
      if (!newProduct.name.trim() || !newProduct.price) {
        throw new Error("Name, price, and URL are required fields.");
      }

      const r = await fetch(`${API_HOST}/createProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${props.session.token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (!r.ok) {
        throw new Error(`Error creating product: ${r.statusText}`);
      }

      await fetchProducts();
      setNewProduct({ name: "", price: "", categories: [], url: "" });
      setError(null);
    } catch (error) {
      console.error("Error creating product:", error);
      setError(error.message || "An error occurred while creating the product.");
    }
  };

  return (
    <div>
      <h2>Manage Products</h2>
      <div>
        <h3>Create New Product</h3>
        <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
        <input
          type="text"
          placeholder="Categories (comma-separated)"
          value={newProduct.categories.join(",")}
          onChange={(e) => setNewProduct({ ...newProduct, categories: e.target.value.split(",") })}
        />
        <input type="text" placeholder="URL" value={newProduct.url} onChange={(e) => setNewProduct({ ...newProduct, url: e.target.value })} />
        <button onClick={handleCreateProduct}>Create</button>
      </div>
      <div>
        <h3>Categories</h3>
        <ul>
          {availableCategories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Products</h3>
        <ul>
          {products.map((product) => (
            <li key={product.id} onClick={() => handleProductClick(product)}>
              ID: {product.id}, {product.name} ({product.price} {currency}) Tags: {product.categories.length ? product.categories.join(", ") : "None"}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Edit Product</h3>
        {selectedProduct && (
          <>
            <input type="text" placeholder="Name" value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} />
            <input type="number" placeholder="Price" value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} />
            <div>
              <h3>Categories</h3>
              {availableCategories.map((category) => {
                return (
                  <label key={category.id}>
                    <input
                      type="checkbox"
                      defaultChecked={editProduct.categories.includes(category.name)}
                      onChange={(e) => handleEditProductCategoryChange(category.name, e.target.checked)}
                    />{" "}
                    {category.name}
                  </label>
                );
              })}
            </div>
            <input type="text" placeholder="URL" value={editProduct.url} onChange={(e) => setEditProduct({ ...editProduct, url: e.target.value })} />
            <button onClick={handleSaveProduct}>Save</button>
            <button onClick={handleDeleteProduct}>Delete</button>
          </>
        )}
        {error && <h3 style={{ color: "red" }}>{error}</h3>}
      </div>
    </div>
  );
};

let mapStateToProps = (state) => ({
  session: state.handleSession,
});

export default connect(mapStateToProps)(ManageProducts);
