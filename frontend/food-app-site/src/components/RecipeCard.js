import React from "react";

const RecipeCard = ({ recipe, onClick }) => {
  const cardStyle = {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center content horizontally
    padding: "15px",
    cursor: "pointer", // Change cursor to pointer to indicate clickability
  };

  const imageStyle = {
    width: "200px", // Moderate width
    height: "200px", // Matching height for square proportion
    objectFit: "cover", // Maintain aspect ratio while covering container
    borderRadius: "6px" // Slightly rounded corners for the image
  };

  const titleStyle = {
    padding: "12px",
    margin: "0 0 10px 0",
    fontSize: "18px",
    fontWeight: "600",
    textAlign: "center" // Center the title text
  };

  // Handle hover effect
  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
    e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
  };

  return (
    <div 
      style={cardStyle} 
      className="recipe-card"
      onClick={onClick} // Add onClick handler passed from parent
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <h3 style={titleStyle}>{recipe.title}</h3>
      <img 
        src={recipe.image} 
        alt={recipe.title} 
        style={imageStyle}
      />
    </div>
  );
};

export default RecipeCard;