import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { API_HOST } from "../config";

const ManageCategories = (props) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  // fetches categories and updates state
  let fetchCategories = async () => {
    try {
      let r = await fetch(`${API_HOST}/viewCategories`, {
        method: "GET",
      });
      let data = await r.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching community users:", error);
      setError(error.message || "An error occurred while fetching community users.");
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setEditCategory(category);
  };

  const handleSaveCategory = async () => {
    try {
      // Check if editCategory is empty
      if (!editCategory.trim()) {
        throw new Error("Category name cannot be empty.");
      }

      // Fetch PUT
      const r = await fetch(`${API_HOST}/editCategory/${selectedCategory}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${props.session.token}`,
        },
        body: JSON.stringify({ name: editCategory }),
      });

      if (!r.ok) {
        throw new Error(`Error updating category: ${r.statusText}`);
      }

      await fetchCategories();
      setSelectedCategory("");
      // Reset error state on success
      setError(null);
    } catch (error) {
      console.error("Error updating category:", error);
      setError(error.message || "An error occurred while updating the category.");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      // Fetch DELETE
      const r = await fetch(`${API_HOST}/deleteCategory/${selectedCategory}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${props.session.token}`,
        },
      });

      if (!r.ok) {
        throw new Error(`Error deleting category: ${r.statusText}`);
      }

      await fetchCategories();
      setSelectedCategory("");
      // Reset error state on success
      setError(null);
    } catch (error) {
      console.error("Error deleting category:", error);
      setError(error.message || "An error occurred while deleting the category.");
    }
  };

  const handleCreateCategory = async () => {
    try {
      if (!newCategory.trim()) {
        throw new Error("Category name cannot be empty.");
      }

      // Fetch POST
      const r = await fetch(`${API_HOST}/createCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${props.session.token}`,
        },
        body: JSON.stringify({ name: newCategory }),
      });

      if (!r.ok) {
        throw new Error(`Error creating category: ${r.statusText}`);
      }

      await fetchCategories();
      setNewCategory("");
      // Reset error state on success
      setError(null);
    } catch (error) {
      console.error("Error creating category:", error);
      setError(error.message || "An error occurred while creating the category.");
    }
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      <div>
        <h3>Create New Category</h3>
        <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value.toUpperCase())} />
        <button onClick={handleCreateCategory}>Create</button>
      </div>
      <div>
        <h3>Categories</h3>
        <ul>
          {categories.map((category) => (
            <li key={category.id} onClick={() => handleCategoryClick(category.name)}>
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Edit Category</h3>
        {selectedCategory && (
          <>
            <input type="text" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} />
            <button onClick={handleSaveCategory}>Save</button>
            <button onClick={handleDeleteCategory}>Delete</button>
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

export default connect(mapStateToProps)(ManageCategories);
