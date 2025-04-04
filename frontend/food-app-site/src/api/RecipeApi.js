// src/api/recipeApi.js
import axios from "axios";

// Mock data for testing purposes
const mockRecipes = [
  { id: 1, title: "Spaghetti Bolognese", image: "images/spagethi.jpeg" },
  { id: 2, title: "Chicken Curry", image: "images/chicken-curry.jpeg" },
  { id: 3, title: "Caesar Salad", image: "images/ceasar-salad.jpeg" }
];

// This function will fetch recipes from the backend or return mock data if the backend is not available
export const fetchRecipes = async () => {
  if (process.env.REACT_APP_USE_MOCK_DATA === "true") {
    return mockRecipes; // Return mock data for testing
  }

  try {
    const response = await axios.get("/api/recipes"); // Replace with your actual API endpoint
    return response.data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching recipes", error);
    throw error; // Throw the error so we can handle it in the component
  }
};

export const fetchIngredients = async () => [
    { id: 1, name: "Tomato" },
    { id: 2, name: "Chicken" },
    { id: 3, name: "Garlic" }
  ];
  
  export const fetchMeals = async () => [
    { id: 1, name: "Main Course" },
    { id: 2, name: "Appetizer" },
    { id: 3, name: "Dessert" }
  ];
  
  export const fetchCuisines = async () => [
    { id: 1, name: "Italian" },
    { id: 2, name: "Chinese" },
    { id: 3, name: "Indian" }
  ];
  
  export const fetchSpecialConsiderations = async () => [
    { id: 1, name: "Vegetarian" },
    { id: 2, name: "Gluten-Free" },
    { id: 3, name: "Nut-Free" }
  ];
