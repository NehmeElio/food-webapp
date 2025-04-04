// src/pages/AddRecipePage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchIngredients, fetchMeals, fetchCuisines, fetchSpecialConsiderations } from "../api/RecipeApi"; // Import your API functions
import IngredientsDropdown from "../components/IngredientDropdown";
import MealTypeDropdown from "../components/MealDropdown";
import SpecialConsiderationDropdown from "../components/SpecialConsiderationDropdown";
import CuisineDropdown from "../components/CuisineDropdown";


const AddRecipePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [mealTypes, setMealTypes] = useState([]);
  const [specialConsiderations, setSpecialConsiderations] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState([]);
  const [selectedSpecialConsideration, setSelectedSpecialConsideration] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ingredientsData, mealsData, cuisinesData, specialConsiderationsData] = await Promise.all([
          fetchIngredients(),
          fetchMeals(),
          fetchCuisines(),
          fetchSpecialConsiderations()
        ]);

        setIngredients(ingredientsData);
        setMealTypes(mealsData);
        setCuisines(cuisinesData);
        setSpecialConsiderations(specialConsiderationsData);
      } catch (error) {
        console.error("Error loading dropdown data", error);
      }
    };

    loadData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      title,
      description,
      image,
      cookingTime,
      servingSize,
      ingredients: selectedIngredients,
      mealType: selectedMeal,
      specialConsideration: selectedSpecialConsideration,
      cuisine: selectedCuisine
    };
    console.log("New Recipe:", newRecipe);
    // Send newRecipe to your backend or save locally

    navigate("/"); // Redirect to home page after submitting
  };

  const handleIngredientChange = (e) => {
    const selected = [...e.target.selectedOptions].map(option => option.value);
    setSelectedIngredients(selected);
  };

  const handleMealChange = (e) => {
    const selected = [...e.target.selectedOptions].map(option => option.value);
    setSelectedMeal(selected);
  };

  const handleSpecialConsiderationChange = (e) => {
    const selected = [...e.target.selectedOptions].map(option => option.value);
    setSelectedSpecialConsideration(selected);
  };

  const handleCuisineChange = (e) => {
    const selected = [...e.target.selectedOptions].map(option => option.value);
    setSelectedCuisine(selected);
  };

  const removeItem = (itemId, type) => {
    if (type === "ingredient") {
      setSelectedIngredients(selectedIngredients.filter(id => id !== itemId));
    } else if (type === "meal") {
      setSelectedMeal(selectedMeal.filter(id => id !== itemId));
    } else if (type === "specialConsideration") {
      setSelectedSpecialConsideration(selectedSpecialConsideration.filter(id => id !== itemId));
    } else if (type === "cuisine") {
      setSelectedCuisine(selectedCuisine.filter(id => id !== itemId));
    }
  };

  return (
    <div className="form-container">
      <h1>Add a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Cooking Time (minutes):</label>
          <input type="number" value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} required />
        </div>
        <div>
          <label>Serving Size:</label>
          <input type="number" value={servingSize} onChange={(e) => setServingSize(e.target.value)} required />
        </div>
        <div>
          <label>Image Upload:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>

        {/* Add the dropdown components here */}
        <IngredientsDropdown 
          ingredients={ingredients} 
          selectedIngredients={selectedIngredients} 
          handleChange={handleIngredientChange} 
          handleRemove={removeItem} 
        />
        <MealTypeDropdown 
          mealTypes={mealTypes} 
          selectedMeal={selectedMeal} 
          handleChange={handleMealChange} 
          handleRemove={removeItem} 
        />
        <SpecialConsiderationDropdown 
          specialConsiderations={specialConsiderations} 
          selectedSpecialConsideration={selectedSpecialConsideration} 
          handleChange={handleSpecialConsiderationChange} 
          handleRemove={removeItem} 
        />
        <CuisineDropdown 
          cuisines={cuisines} 
          selectedCuisine={selectedCuisine} 
          handleChange={handleCuisineChange} 
          handleRemove={removeItem} 
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddRecipePage;
