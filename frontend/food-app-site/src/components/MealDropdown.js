// src/components/MealTypeDropdown.js
import React from "react";

const MealTypeDropdown = ({ mealTypes, selectedMeal, handleChange, handleRemove }) => {
  return (
    <div className="card">
      <h3>Meal Type</h3>
      <select multiple onChange={handleChange}>
        {mealTypes.map((meal) => (
          <option key={meal.id} value={meal.id}>
            {meal.name}
          </option>
        ))}
      </select>
      <div>
        {selectedMeal.map((mealId) => {
          const meal = mealTypes.find((m) => m.id === mealId);
          return (
            <div key={mealId} className="selected-item">
              {meal?.name}
              <button type="button" onClick={() => handleRemove(mealId, "meal")}>
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
