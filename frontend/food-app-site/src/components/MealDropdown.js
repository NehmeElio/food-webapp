import React, { useState } from "react";

const MealTypeDropdown = ({ mealTypes, selectedMeal, handleChange, handleRemove }) => {
  const [isOpen, setIsOpen] = useState(false); // Toggle dropdown visibility

  // Toggle dropdown with preventDefault to stop form submission
  const toggleDropdown = (e) => {
    e.preventDefault(); // Prevent the event from bubbling up to the form
    setIsOpen(!isOpen);
  };

  // Handle the selection of an option
  const handleOptionClick = (e, mealId) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Stop event bubbling
    
    // Add meal to selected list if not already selected
    if (!selectedMeal.includes(mealId)) {
      handleChange(mealId);
    }
  };

  return (
    <div className="card">
      <h3>Meal Type</h3>
      <div className="dropdown-header">
        <button 
          type="button" // Explicitly set button type to prevent form submission
          onClick={toggleDropdown}
        >
          {isOpen ? "Close" : "Select Meal Types"}
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
          {mealTypes.map((meal) => (
            <div
              key={meal.id}
              className="dropdown-option"
              onClick={(e) => handleOptionClick(e, meal.id)}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                backgroundColor: selectedMeal.includes(meal.id) ? "#f0f0f0" : "transparent",
                borderBottom: "1px solid #eee"
              }}
            >
              {meal.name}
            </div>
          ))}
        </div>
      )}

      {/* Selected meal types list */}
      <div className="selected-items">
        {selectedMeal.map((mealId) => {
          const meal = mealTypes.find((m) => m.id === mealId);
          return (
            <div key={mealId} className="selected-item">
              {meal?.name}
              <button
                type="button" // Explicitly set button type
                onClick={(e) => {
                  e.preventDefault(); // Prevent form submission
                  handleRemove(mealId, "meal");
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

export default MealTypeDropdown;