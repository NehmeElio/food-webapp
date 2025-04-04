from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import load_cuisine
import load_meal
import load_special
import asyncio
import logging
import os
import shutil
from fastapi.responses import JSONResponse

# Initialize FastAPI app
app = FastAPI()

# Set up logging configuration
logging.basicConfig(
    level=logging.DEBUG,  # Capture DEBUG level and above (INFO, WARNING, ERROR, CRITICAL)
    format='%(asctime)s - %(levelname)s - %(message)s',  # Log format
    handlers=[
        logging.StreamHandler(),  # Logs to console
        logging.FileHandler('app.log')  # Logs to a file (app.log)
    ]
)

# Global variables to store models and MLBs
mlb_cuisine = None
mlb_cuisine_ingredient = None
models_cuisine = None

mlb_meal = None
mlb_meal_ingredient = None
models_meal = None

mlb_special = None
mlb_special_ingredient = None
models_special = None

# Helper function to load resources concurrently
async def load_cuisine_resources():
    global mlb_cuisine, mlb_cuisine_ingredient, models_cuisine
    try:
        mlb_cuisine = load_cuisine.load_cuisine_mlb()
        mlb_cuisine_ingredient = load_cuisine.load_cuisine_ingredient_mlb()
        models_cuisine = load_cuisine.load_cuisine_models()
    except Exception as e:
        logging.error(f"Error loading cuisine resources: {e}")
        raise HTTPException(status_code=500, detail="Failed to load cuisine resources")

async def load_meal_resources():
    global mlb_meal, mlb_meal_ingredient, models_meal
    try:
        mlb_meal = load_meal.load_meal_mlb()
        mlb_meal_ingredient = load_meal.load_meal_ingredient_mlb()
        models_meal = load_meal.load_meal_models()
    except Exception as e:
        logging.error(f"Error loading meal resources: {e}")
        raise HTTPException(status_code=500, detail="Failed to load meal resources")

async def load_special_resources():
    global mlb_special, mlb_special_ingredient, models_special
    try:
        mlb_special = load_special.load_special_mlb()
        mlb_special_ingredient = load_special.load_special_ingredient_mlb()
        models_special = load_special.load_special_models()
    except Exception as e:
        logging.error(f"Error loading special resources: {e}")
        raise HTTPException(status_code=500, detail="Failed to load special resources")

# Asynchronous function to load all resources concurrently
async def load_all_resources():
    try:
        os.makedirs("ml_service/tmp", exist_ok=True)
        os.makedirs("ml_service/tmp/meal", exist_ok=True)
        os.makedirs("ml_service/tmp/special", exist_ok=True)
        os.makedirs("ml_service/tmp/cuisine", exist_ok=True)
        print(f"Recreated the 'tmp' directory at: ml_service/tmp")
        
        await asyncio.gather(
            load_meal_resources(),
            load_cuisine_resources(),
            load_special_resources()
        )
        
    except Exception as e:
        logging.error(f"Error during resource loading: {e}")
        raise HTTPException(status_code=500, detail="Failed to load resources")

    # After usage, delete the contents of the temporary directory
    try:
        shutil.rmtree("ml_service/tmp")
        print("temp dir removed")
    except Exception as e:
        logging.error(f"Error clearing temporary directory: {e}")
        raise HTTPException(status_code=500, detail="Failed to clean up resources")

# Request body model
class IngredientsRequest(BaseModel):
    ingredients: List[str]

@app.on_event("startup")
async def startup():
    # Load all resources concurrently when the app starts
    await load_all_resources()
    print("All resources loaded successfully")

@app.post("/predict/cuisine")
async def predict(request: IngredientsRequest):
    ingredients = request.ingredients
    
    if not ingredients:
        raise HTTPException(status_code=400, detail="No ingredients provided")

    try:
        # Use the load_cuisine functions to predict the cuisines
        processed_input = load_cuisine.binarize_ingredients(mlb_cuisine_ingredient, ingredients)
        cuisines = load_cuisine.predict_cuisine(processed_input, models_cuisine, mlb_cuisine)
    except Exception as e:
        logging.error(f"Error during cuisine prediction: {e}")
        raise HTTPException(status_code=500, detail="Error processing the prediction")

    return {"cuisines": cuisines}

@app.post("/predict/meal")
async def predict(request: IngredientsRequest):
    ingredients = request.ingredients
    
    if not ingredients:
        raise HTTPException(status_code=400, detail="No ingredients provided")

    try:
        processed_input = load_meal.binarize_ingredients(mlb_meal_ingredient, ingredients)
        meals = load_meal.predict_meal(processed_input, models_meal, mlb_meal)
    except Exception as e:
        logging.error(f"Error during meal prediction: {e}")
        raise HTTPException(status_code=500, detail="Error processing the prediction")

    return {"meals": meals}

@app.post("/predict/special")
async def predict(request: IngredientsRequest):
    ingredients = request.ingredients
    
    if not ingredients:
        raise HTTPException(status_code=400, detail="No ingredients provided")

    try:
        processed_input = load_special.binarize_ingredients(mlb_special_ingredient, ingredients)
        specials = load_special.predict_special(processed_input, models_special, mlb_special)
    except Exception as e:
        logging.error(f"Error during special prediction: {e}")
        raise HTTPException(status_code=500, detail="Error processing the prediction")

    return {"meals": specials}

# Global exception handler for uncaught errors
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logging.error(f"Unexpected error occurred: {exc}")
    return JSONResponse(
        status_code=500,
        content={"message": f"An unexpected error occurred: {exc}"},
    )

@app.get("/health")
def health_check():
    return {"status": "ok"}

# Run the FastAPI app using Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
