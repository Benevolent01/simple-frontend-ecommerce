import { ADD_CATEGORY, REMOVE_CATEGORY } from "../actions";

let LOCAL_CATEGORIES_NOW = "categoriesNow";

let initialState = {
  categories: [],
};

let localStorageCategories = localStorage.getItem(LOCAL_CATEGORIES_NOW);

if (localStorageCategories) {
  initialState.categories = JSON.parse(localStorageCategories);
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY: {
      let updatedCategories = { ...state, categories: [...state.categories, action.category] };
      localStorage.setItem(LOCAL_CATEGORIES_NOW, JSON.stringify(updatedCategories.categories));
      return updatedCategories;
    }
    case REMOVE_CATEGORY: {
      let updatedCategories = { ...state, categories: state.categories.filter((category) => category !== action.category) };
      localStorage.setItem(LOCAL_CATEGORIES_NOW, JSON.stringify(updatedCategories.categories));
      return updatedCategories;
    }
    default:
      return state;
  }
};
