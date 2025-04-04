import React, { useState } from "react";

const IngredientsDropdown = ({ ingredients, selectedIngredients, handleChange, handleRemove }) => {
  const [isOpen, setIsOpen] = useState(false); // Toggle dropdown visibility

  // Toggle dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle the selection of an option
  const handleOptionClick = (ingredientId) => {
    // Add ingredient to selected list if not already selected
    if (!selectedIngredients.includes(ingredientId)) {
      handleChange(ingredientId);
    }
  };

  return (
    <div className="card">
      <h3>Ingredients</h3>
      <div className="dropdown-header" onClick={toggleDropdown}>
        <button>{isOpen ? "Close" : "Select Ingredients"}</button>
      </div>

      {/* Dropdown list */}
      {isOpen && (
        <div className="dropdown-list">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="dropdown-option"
              onClick={() => handleOptionClick(ingredient.id)}
            >
              {ingredient.name}
            </div>
          ))}
        </div>
      )}

      {/* Selected ingredients list */}
      <div className="selected-items">
        {selectedIngredients.map((ingredientId) => {
          const ingredient = ingredients.find((i) => i.id === ingredientId);
          return (
            <div key={ingredientId} className="selected-item">
              {ingredient?.name}
              <button
                type="button"
                onClick={() => handleRemove(ingredientId, "ingredient")}
                className="remove-btn"
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IngredientsDropdown;
