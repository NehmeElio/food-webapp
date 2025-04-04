// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { fetchRecipes } from "../api/RecipeApi"; // Import the API function

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true); // For handling loading state
  const [error, setError] = useState(null); // For handling errors

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

  return (
    <div>
      <h1>Recipe Collection</h1>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <button>
        <a href="/add-recipe">Add a Recipe</a>
      </button>
    </div>
  );
};

export default HomePage;
