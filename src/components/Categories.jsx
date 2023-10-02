import { useEffect, useState } from "react";
import "../styles/Categories.css";
import { connect } from "react-redux";
import { addCategory, removeCategory, updateProducts } from "../actions";
import { API_HOST } from "../config";

const Categories = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  let fetchCategories = async () => {
    try {
      let r = await fetch(`${API_HOST}/viewCategories`, {
        method: "GET",
      });
      let data = await r.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleUpdateCategories = (e, categoryName) => {
    if (e.target.checked) {
      props.dispatch(addCategory(categoryName));
    } else {
      props.dispatch(removeCategory(categoryName));
    }
  };

  useEffect(() => {
    let filteredProducts = props.showProducts.filter((product) => {
      return props.categories.every((neededCategory) => product.categories.includes(neededCategory));
    });
    props.dispatch(updateProducts(filteredProducts));
  }, [props.categories, props.showProducts]);

  const isCategoryOn = (categoryName) => {
    return props.categories.includes(categoryName);
  };

  return (
    <>
      <div className="category-outer">
        <h2 className="category-title">Categories</h2>
        <div className="category-main">
          {categories.length ? (
            categories.map((category) => (
              <label className="category-single" key={category.name}>
                <input
                  type="checkbox"
                  name={category.name}
                  onClick={(e) => handleUpdateCategories(e, category.name)}
                  defaultChecked={isCategoryOn(category.name)}
                />
                <div className="category-text">
                  <span>{category.name}</span>
                </div>
              </label>
            ))
          ) : (
            <h4 className="categories-404">There are no categories currently</h4>
          )}
        </div>
      </div>
    </>
  );
};

let mapStateToProps = (state) => ({
  showProducts: state.handleProducts.fetchedProducts,
  categories: state.handleCategories.categories,
});

export default connect(mapStateToProps)(Categories);
