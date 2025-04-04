// src/components/CuisineDropdown.js
import React from "react";

const CuisineDropdown = ({ cuisines, selectedCuisine, handleChange, handleRemove }) => {
  return (
    <div className="card">
      <h3>Cuisine</h3>
      <select multiple onChange={handleChange}>
        {cuisines.map((cuisine) => (
          <option key={cuisine.id} value={cuisine.id}>
            {cuisine.name}
          </option>
        ))}
      </select>
      <div>
        {selectedCuisine.map((cuisineId) => {
          const cuisine = cuisines.find((c) => c.id === cuisineId);
          return (
            <div key={cuisineId} className="selected-item">
              {cuisine?.name}
              <button type="button" onClick={() => handleRemove(cuisineId, "cuisine")}>
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
