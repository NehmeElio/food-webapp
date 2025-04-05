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

  // For Ingredients
  const handleIngredientChange = (ingredientId) => {
    // Add the ingredient ID to the selected ingredients array
    setSelectedIngredients([...selectedIngredients, ingredientId]);
  };

  // For Meal Types
  const handleMealChange = (mealId) => {
    // Add the meal ID to the selected meals array
    setSelectedMeal([...selectedMeal, mealId]);
  };

  // For Special Considerations
  const handleSpecialConsiderationChange = (specialConsiderationId) => {
    // Add the special consideration ID to the selected array
    setSelectedSpecialConsideration([...selectedSpecialConsideration, specialConsiderationId]);
  };

  // For Cuisines
  const handleCuisineChange = (cuisineId) => {
    // Add the cuisine ID to the selected cuisines array
    setSelectedCuisine([...selectedCuisine, cuisineId]);
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

  // Form field styles
  const formFieldStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  };

  const labelStyle = {
    flex: "0 0 30%",
    textAlign: "right",
    paddingRight: "15px",
    fontWeight: "bold"
  };

  const inputStyle = {
    flex: "0 0 65%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  };

  // Submit button styles
  const submitButtonContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "30px"
  };

  const submitButtonStyle = {
    padding: "12px 24px",
    backgroundColor: "#4CAF50", // Green color for distinction
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
  };

  return (
    <div className="form-container" style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Add a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div style={formFieldStyle}>
          <label style={labelStyle}>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            style={inputStyle}
          />
        </div>
        <div style={formFieldStyle}>
          <label style={labelStyle}>Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            style={{...inputStyle, minHeight: "100px"}}
          />
        </div>
        <div style={formFieldStyle}>
          <label style={labelStyle}>Cooking Time (minutes):</label>
          <input 
            type="number" 
            value={cookingTime} 
            onChange={(e) => setCookingTime(e.target.value)} 
            required 
            style={inputStyle}
          />
        </div>
        <div style={formFieldStyle}>
          <label style={labelStyle}>Serving Size:</label>
          <input 
            type="number" 
            value={servingSize} 
            onChange={(e) => setServingSize(e.target.value)} 
            required 
            style={inputStyle}
          />
        </div>
        <div style={formFieldStyle}>
          <label style={labelStyle}>Image Upload:</label>
          <input 
            type="file" 
            onChange={(e) => setImage(e.target.files[0])} 
            style={inputStyle}
          />
        </div>

        {/* Add the dropdown components here */}
        <div style={{ marginTop: "30px" }}>
          <IngredientsDropdown 
            ingredients={ingredients} 
            selectedIngredients={selectedIngredients} 
            handleChange={handleIngredientChange} 
            handleRemove={removeItem} 
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <MealTypeDropdown 
            mealTypes={mealTypes} 
            selectedMeal={selectedMeal} 
            handleChange={handleMealChange} 
            handleRemove={removeItem} 
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <SpecialConsiderationDropdown 
            specialConsiderations={specialConsiderations} 
            selectedSpecialConsideration={selectedSpecialConsideration} 
            handleChange={handleSpecialConsiderationChange} 
            handleRemove={removeItem} 
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <CuisineDropdown 
            cuisines={cuisines} 
            selectedCuisine={selectedCuisine} 
            handleChange={handleCuisineChange} 
            handleRemove={removeItem} 
          />
        </div>

        <div style={submitButtonContainerStyle}>
          <button 
            type="submit" 
            style={submitButtonStyle}
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipePage;