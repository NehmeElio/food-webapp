using food_webapp_backend.DTO;
using food_webapp_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace food_webapp_backend.Controllers
{
     [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly FoodContext _context;

        public RecipesController(FoodContext context)
        {
            _context = context;
        }

        // 1. Add Recipe Endpoint (POST /api/recipes)
        [HttpPost]
public async Task<IActionResult> AddRecipe([FromBody] AddRecipeDto newRecipeDto)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState); // Return validation errors
    }

    try
    {
        // Create the recipe
        var newRecipe = new Recipe
        {
            Title = newRecipeDto.Title,
            Description = newRecipeDto.Description,
            Instructions = newRecipeDto.Instructions,
            CookingTime = newRecipeDto.CookingTime,
            Servings = newRecipeDto.Servings,
            ImageFilename = newRecipeDto.ImageFilename
        };

        // Add the new recipe to the database
        _context.Recipes.Add(newRecipe);
        await _context.SaveChangesAsync(); // Save changes to DB (new recipe inserted)

        // Add related entities to many-to-many tables

        // Add meals to RecipeMeals table
        foreach (var mealId in newRecipeDto.MealIds)
        {
            _context.RecipeMeals.Add(new RecipeMeal { RecipeId = newRecipe.RecipeId, MealId = mealId });
        }

        // Add ingredients to RecipeIngredients table
        foreach (var ingredientId in newRecipeDto.IngredientIds)
        {
            _context.RecipeIngredients.Add(new RecipeIngredient { RecipeId = newRecipe.RecipeId, IngredientId = ingredientId });
        }

        // Add cuisines to RecipeCuisines table
        foreach (var cuisineId in newRecipeDto.CuisineIds)
        {
            _context.RecipeCuisines.Add(new RecipeCuisine { RecipeId = newRecipe.RecipeId, CuisineGroupedId = cuisineId });
        }

        // Add special considerations to RecipeSpecials table
        foreach (var specialId in newRecipeDto.SpecialIds)
        {
            _context.RecipeSpecials.Add(new RecipeSpecial { RecipeId = newRecipe.RecipeId, SpecialConsiderationId = specialId });
        }

        // Save changes to related tables
        await _context.SaveChangesAsync();

        // Return the created recipe with its related data
        return CreatedAtAction(nameof(GetRecipeById), new { id = newRecipe.RecipeId }, newRecipe);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}


        // 2. Get All Recipes Endpoint (GET /api/recipes)
        [HttpGet]
        public async Task<IActionResult> GetAllRecipes()
        {
            // Step 1: Retrieve all recipes
            var recipes = await _context.Recipes.ToListAsync();

            // Step 2: For each recipe, fetch related data (ingredients, meals, special considerations, cuisines)
            var recipeData = new List<object>();

            foreach (var recipe in recipes)
            {
                // Fetch ingredients for each recipe
                var ingredientIds = await _context.RecipeIngredients
                    .Where(ri => ri.RecipeId == recipe.RecipeId)
                    .Select(ri => ri.IngredientId)
                    .ToListAsync();

                // Fetch meals for each recipe
                var mealIds = await _context.RecipeMeals
                    .Where(rm => rm.RecipeId == recipe.RecipeId)
                    .Select(rm => rm.MealId)
                    .ToListAsync();

                // Fetch special considerations for each recipe
                var specialIds = await _context.RecipeSpecials
                    .Where(rs => rs.RecipeId == recipe.RecipeId)
                    .Select(rs => rs.SpecialConsiderationId)
                    .ToListAsync();

                // Fetch cuisines for each recipe
                var cuisineIds = await _context.RecipeCuisines
                    .Where(rc => rc.RecipeId == recipe.RecipeId)
                    .Select(rc => rc.CuisineGroupedId)
                    .ToListAsync();

                // Add the recipe data along with related data
                var recipeWithRelatedData = new
                {
                    recipe_id = recipe.RecipeId,
                    title = recipe.Title,
                    description = recipe.Description,
                    instructions = recipe.Instructions,
                    cooking_time = recipe.CookingTime,
                    servings = recipe.Servings,
                    image_filename = recipe.ImageFilename,
                    ingredients = ingredientIds,
                    meals = mealIds,
                    specials = specialIds,
                    cuisines = cuisineIds,
                };

                recipeData.Add(recipeWithRelatedData);
            }

            // Step 3: Return all recipes with related data
            return Ok(recipeData);
        }



        // 3. Get Recipe by ID Endpoint (GET /api/recipes/{id})
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecipeById(long id)
        {
            // Step 1: Retrieve the main recipe by its ID
            var recipe = await _context.Recipes
                .FirstOrDefaultAsync(r => r.RecipeId == id);

            if (recipe == null)
            {
                return NotFound("Recipe not found.");
            }

            var ingredientIds = await _context.RecipeIngredients
                .Where(ri => ri.RecipeId == recipe.RecipeId)
                .Select(ri => ri.IngredientId)
                .ToListAsync();


            var mealIds = await _context.RecipeMeals
                .Where(rm => rm.RecipeId == recipe.RecipeId)
                .Select(rm => rm.MealId)
                .ToListAsync();
            

            var specialIds = await _context.RecipeSpecials
                .Where(rs => rs.RecipeId == recipe.RecipeId)
                .Select(rs => rs.SpecialConsiderationId)
                .ToListAsync();
            
            var cuisineIds = await _context.RecipeCuisines
                .Where(rc => rc.RecipeId == recipe.RecipeId)
                .Select(rc => rc.CuisineGroupedId)
                .ToListAsync();
            

           
            

            var recipeWithRelatedData = new
            {
                recipe_id = recipe.RecipeId,
                title = recipe.Title,
                description = recipe.Description,
                instructions = recipe.Instructions,
                cooking_time = recipe.CookingTime,
                servings = recipe.Servings,
                image_filename = recipe.ImageFilename,
                ingredients = ingredientIds,
                meals = mealIds,
                specials = specialIds,
                cuisines = cuisineIds,
                
            };
            // Step 6: Return the recipe with all the related data
            return Ok(recipeWithRelatedData);
        }
        
        [HttpGet("titles")]
        public async Task<IActionResult> GetAllRecipesTitles()
        {
            // Step 1: Retrieve all recipes but only select the Title and ImageFilename columns
            var recipes = await _context.Recipes
                .Select(r => new 
                {
                    r.Title,
                    r.ImageFilename
                })
                .ToListAsync();

            // Step 2: Return the recipes with only title and image filename
            return Ok(recipes);
        }



    }
    
    
}
