import React, { useState } from "react";

const SpecialConsiderationDropdown = ({ specialConsiderations, selectedSpecialConsideration, handleChange, handleRemove }) => {
  const [isOpen, setIsOpen] = useState(false); // Toggle dropdown visibility

  // Toggle dropdown with preventDefault to stop form submission
  const toggleDropdown = (e) => {
    e.preventDefault(); // Prevent the event from bubbling up to the form
    setIsOpen(!isOpen);
  };

  // Handle the selection of an option
  const handleOptionClick = (e, considerationId) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Stop event bubbling
    
    // Add consideration to selected list if not already selected
    if (!selectedSpecialConsideration.includes(considerationId)) {
      handleChange(considerationId);
    }
  };

  return (
    <div className="card">
      <h3>Special Considerations</h3>
      <div className="dropdown-header">
        <button 
          type="button" // Explicitly set button type to prevent form submission
          onClick={toggleDropdown}
        >
          {isOpen ? "Close" : "Select Special Considerations"}
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
          {specialConsiderations.map((consideration) => (
            <div
              key={consideration.id}
              className="dropdown-option"
              onClick={(e) => handleOptionClick(e, consideration.id)}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                backgroundColor: selectedSpecialConsideration.includes(consideration.id) ? "#f0f0f0" : "transparent",
                borderBottom: "1px solid #eee"
              }}
            >
              {consideration.name}
            </div>
          ))}
        </div>
      )}

      {/* Selected special considerations list */}
      <div className="selected-items">
        {selectedSpecialConsideration.map((considerationId) => {
          const consideration = specialConsiderations.find((c) => c.id === considerationId);
          return (
            <div key={considerationId} className="selected-item">
              {consideration?.name}
              <button
                type="button" // Explicitly set button type
                onClick={(e) => {
                  e.preventDefault(); // Prevent form submission
                  handleRemove(considerationId, "specialConsideration");
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

export default SpecialConsiderationDropdown;