// src/components/SpecialConsiderationDropdown.js
import React from "react";

const SpecialConsiderationDropdown = ({ specialConsiderations, selectedSpecialConsideration, handleChange, handleRemove }) => {
  return (
    <div className="card">
      <h3>Special Considerations</h3>
      <select multiple onChange={handleChange}>
        {specialConsiderations.map((consideration) => (
          <option key={consideration.id} value={consideration.id}>
            {consideration.name}
          </option>
        ))}
      </select>
      <div>
        {selectedSpecialConsideration.map((considerationId) => {
          const consideration = specialConsiderations.find((c) => c.id === considerationId);
          return (
            <div key={considerationId} className="selected-item">
              {consideration?.name}
              <button type="button" onClick={() => handleRemove(considerationId, "specialConsideration")}>
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
