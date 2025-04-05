import React, { useState } from "react";

const CuisineDropdown = ({ cuisines, selectedCuisine, handleChange, handleRemove }) => {
  const [isOpen, setIsOpen] = useState(false); // Toggle dropdown visibility

  // Toggle dropdown with preventDefault to stop form submission
  const toggleDropdown = (e) => {
    e.preventDefault(); // Prevent the event from bubbling up to the form
    setIsOpen(!isOpen);
  };

  // Handle the selection of an option
  const handleOptionClick = (e, cuisineId) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Stop event bubbling
    
    // Add cuisine to selected list if not already selected
    if (!selectedCuisine.includes(cuisineId)) {
      handleChange(cuisineId);
    }
  };

  return (
    <div className="card">
      <h3>Cuisine</h3>
      <div className="dropdown-header">
        <button 
          type="button" // Explicitly set button type to prevent form submission
          onClick={toggleDropdown}
        >
          {isOpen ? "Close" : "Select Cuisines"}
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
          {cuisines.map((cuisine) => (
            <div
              key={cuisine.id}
              className="dropdown-option"
              onClick={(e) => handleOptionClick(e, cuisine.id)}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                backgroundColor: selectedCuisine.includes(cuisine.id) ? "#f0f0f0" : "transparent",
                borderBottom: "1px solid #eee"
              }}
            >
              {cuisine.name}
            </div>
          ))}
        </div>
      )}

      {/* Selected cuisines list */}
      <div className="selected-items">
        {selectedCuisine.map((cuisineId) => {
          const cuisine = cuisines.find((c) => c.id === cuisineId);
          return (
            <div key={cuisineId} className="selected-item">
              {cuisine?.name}
              <button
                type="button" // Explicitly set button type
                onClick={(e) => {
                  e.preventDefault(); // Prevent form submission
                  handleRemove(cuisineId, "cuisine");
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

export default CuisineDropdown;