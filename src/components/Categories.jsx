import { useEffect } from "react";
import "../styles/Categories.css";
import { connect } from "react-redux";
import { getCategories, addCategory, removeCategory, updateProducts } from "../actions";
import { API_HOST } from "../config";

/*
The category here theoretically is one, and there are many tags.
Many categories => Many tags, another junction table category-tag

Once we filter, and change page, save that, either queries (1) or, local storage (2).
I chose (2) here.
*/

const Categories = (props) => {
  let populateCategories = async () => {
    let r = await fetch(`${API_HOST}/viewCategories`);
    let data = await r.json();
    props.dispatch(getCategories(data));
  };

  useEffect(() => {
    populateCategories();
  }, [props.showCategories]);

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
  }, [props.categories]);

  const isCategoryOn = (categoryName) => {
    return props.categories.includes(categoryName);
  };

  return (
    <>
      <div className="category-outer">
        <h2 className="category-title">Categories</h2>
        <div className="category-main">
          {props.showCategories.length ? (
            props.showCategories.map((category) => (
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
  showCategories: state.handleCategories.fetchedCategories,
  categories: state.handleCategories.categories,
});

export default connect(mapStateToProps)(Categories);
