import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeById } from "../api/RecipeApi"; // Import your API function

const RecipeDetailPage = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get the recipe ID from URL params

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        setLoading(true);
        const fetchedRecipe = await fetchRecipeById(id);
        setRecipe(fetchedRecipe);
      } catch (error) {
        setError("Failed to load recipe details.");
        console.error("Error loading recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]); // Re-fetch if the ID changes

  if (loading) return <div className="loading">Loading recipe details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!recipe) return <div className="error">Recipe not found.</div>;

  // Styles
  const pageStyle = {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif"
  };

  const headerStyle = {
    borderBottom: "1px solid #eaeaea",
    paddingBottom: "20px",
    marginBottom: "20px"
  };

  const titleStyle = {
    position: "center",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333"
  };

  const imageStyle = {
    width: "100%",
    maxHeight: "400px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "30px"
  };

  const metaInfoStyle = {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "30px"
  };

  const metaItemStyle = {
    textAlign: "center"
  };

  const metaLabelStyle = {
    color: "#666",
    fontSize: "14px"
  };

  const metaValueStyle = {
    fontWeight: "bold",
    fontSize: "16px",
    color: "#333"
  };

  const sectionStyle = {
    marginBottom: "30px"
  };

  const sectionTitleStyle = {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#444",
    borderBottom: "2px solid #eaeaea",
    paddingBottom: "10px"
  };

  const ingredientListStyle = {
    listStyleType: "none",
    padding: 0
  };

  const ingredientItemStyle = {
    padding: "8px 0",
    borderBottom: "1px solid #f0f0f0"
  };

  const tagStyle = {
    display: "inline-block",
    backgroundColor: "#e0f7fa",
    color: "#0097a7",
    padding: "6px 12px",
    borderRadius: "20px",
    margin: "0 8px 8px 0",
    fontSize: "14px"
  };

  const descriptionStyle = {
    lineHeight: "1.6",
    color: "#444"
  };

  // Format lists of tags (meal type, special considerations, cuisine)
  const renderTags = (items) => {
    if (!items || items.length === 0) return <p>Not specified</p>;
    
    return (
      <div className="tags">
        {items.map((item, index) => (
          <span key={index} style={tagStyle}>{item.name || item}</span>
        ))}
      </div>
    );
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>{recipe.title}</h1>
      </div>

      {/* Recipe Image */}
      {recipe.image && (
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          style={imageStyle} 
        />
      )}

      {/* Meta Information */}
      <div style={metaInfoStyle}>
        <div style={metaItemStyle}>
          <div style={metaLabelStyle}>Cooking Time</div>
          <div style={metaValueStyle}>{recipe.cookingTime} mins</div>
        </div>
        <div style={metaItemStyle}>
          <div style={metaLabelStyle}>Serving Size</div>
          <div style={metaValueStyle}>{recipe.servingSize} servings</div>
        </div>
      </div>

      {/* Ingredients */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Ingredients</h2>
        <ul style={ingredientListStyle}>
          {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
            <li key={index} style={ingredientItemStyle}>
              {ingredient.name || ingredient}
            </li>
          ))}
        </ul>
      </div>

      {/* Meal Type */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Meal Type</h2>
        {renderTags(recipe.mealType)}
      </div>

      {/* Cuisine */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Cuisine</h2>
        {renderTags(recipe.cuisine)}
      </div>

      {/* Special Considerations */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Special Considerations</h2>
        {renderTags(recipe.specialConsideration)}
      </div>

      {/* Description / Cooking Instructions */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>How to Cook</h2>
        <div style={descriptionStyle}>{recipe.description}</div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;