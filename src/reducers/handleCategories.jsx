import { GET_CATEGORIES, ADD_CATEGORY, REMOVE_CATEGORY } from "../actions";

let LOCAL_FETCHED_CATEGORIES = "categoriesNow";

let initialState = {
  fetchedCategories: [],
  categories: [],
};

const localFetchedCategories = localStorage.getItem(LOCAL_FETCHED_CATEGORIES);

if (localFetchedCategories) {
  initialState.categories = JSON.parse(localFetchedCategories);
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, fetchedCategories: action.categories };
    case ADD_CATEGORY: {
      let updatedCategories = { ...state, categories: [...state.categories, action.category] };
      localStorage.setItem(LOCAL_FETCHED_CATEGORIES, JSON.stringify(updatedCategories.categories));
      return updatedCategories;
    }
    case REMOVE_CATEGORY: {
      let updatedCategories = { ...state, categories: state.categories.filter((category) => category !== action.category) };
      localStorage.setItem(LOCAL_FETCHED_CATEGORIES, JSON.stringify(updatedCategories.categories));
      return updatedCategories;
    }
    default:
      return state;
  }
};
