import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { fetchRecipes } from "../api/RecipeApi"; // Import the API function

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true); // For handling loading state
  const [error, setError] = useState(null); // For handling errors
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const fetchedRecipes = await fetchRecipes();
        setRecipes(fetchedRecipes);
      } catch (error) {
        setError("Failed to load recipes.");
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const addButtonContainerStyle = {
      position: "relative",
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
    };
  
  const addButtonStyle = {
      position: "fixed",  // Fixed positioning relative to the viewport
      top: "15px",        // Distance from the top of the viewport
      right: "30px",      // Distance from the right edge
      padding: "10px 20px",
      backgroundColor: "#4CAF50", // Green color for distinction
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      transition: "transform 0.2s, background-color 0.2s",
      zIndex: 1100,       // Higher than the banner's zIndex (1000)
  };
  
  // Grid style for 3 recipes per row
  const recipeGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
    gap: "20px",
    marginTop: "30px",
    paddingTop: "120px", // Space for the fixed banner
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20 20px",
  };

  const bannerStyle = {
    position: "fixed", // Fix the banner at the top of the viewport
    top: "0",          // Align it to the top of the page
    left: "0",         // Align it to the left edge
    width: "100%",     // Make it span the full width of the page
    backgroundColor: "#f8f8f8", // Light background for the banner
    textAlign: "center",
    padding: "10px 0", // Add some vertical padding
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
    zIndex: 1000,      // Ensure it stays above other elements
    margin: "0",
  };

  const handleAddRecipeClick = () => {
    navigate('/add-recipe'); // Navigate to the add-recipe route
  };
  
  // Handle recipe card click - navigate to the detail page
  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`); // Navigate to the recipe detail page with the recipe ID
  };

  return (
    <div>
      <h1 style={bannerStyle}>Recipe Collection</h1>
      <div style={recipeGridStyle}>
        {recipes.map((recipe) => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe} 
            onClick={() => handleRecipeClick(recipe.id)} 
          />
        ))}
      </div>
      <div style={addButtonContainerStyle}>
        <button 
          type="button" 
          style={addButtonStyle}
          onClick={handleAddRecipeClick}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#45a049";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#4CAF50";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Add Recipe
        </button>
      </div>
    </div>
  );
};

export default HomePage;