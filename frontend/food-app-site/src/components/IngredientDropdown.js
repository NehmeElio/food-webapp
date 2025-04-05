import React, { useState } from "react";

const IngredientsDropdown = ({ ingredients, selectedIngredients, handleChange, handleRemove }) => {
  const [isOpen, setIsOpen] = useState(false); // Toggle dropdown visibility

  // Toggle dropdown with preventDefault to stop form submission
  const toggleDropdown = (e) => {
    e.preventDefault(); // Prevent the event from bubbling up to the form
    setIsOpen(!isOpen);
  };

  // Handle the selection of an option
  const handleOptionClick = (e, ingredientId) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Stop event bubbling
    
    // Add ingredient to selected list if not already selected
    if (!selectedIngredients.includes(ingredientId)) {
      handleChange(ingredientId);
    }
  };

  return (
    <div className="card">
      <h3>Ingredients</h3>
      <div className="dropdown-header">
        <button 
          type="button" // Explicitly set button type to prevent form submission
          onClick={toggleDropdown}
        >
          {isOpen ? "Close" : "Select Ingredients"}
        </button>
      </div>

      {/* Dropdown list with scroll */}
      {isOpen && (
        <div className="dropdown-list" style={{ 
          maxHeight: "200px", 
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: "4px"
        }}>
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="dropdown-option"
              onClick={(e) => handleOptionClick(e, ingredient.id)}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                backgroundColor: selectedIngredients.includes(ingredient.id) ? "#f0f0f0" : "transparent",
                borderBottom: "1px solid #eee"
              }}
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
                type="button" // Explicitly set button type
                onClick={(e) => {
                  e.preventDefault(); // Prevent form submission
                  handleRemove(ingredientId, "ingredient");
                }}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IngredientsDropdown;