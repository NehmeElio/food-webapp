using food_webapp_backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace food_webapp_backend.Controllers
{
    public class AttributeController : ControllerBase
    {
        private readonly FoodContext _context;
        private readonly ILogger<AttributeController> _logger;

        public AttributeController(FoodContext context, ILogger<AttributeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // Get all meals, returning only their name and attribute
        [HttpGet("meal")]
        public async Task<ActionResult<List<object>>> GetAllMeals()
        {
            var meals = await _context.Meals
                .Select(m => new { m.MealId, m.Meal1 })  // Select only name and attribute
                .ToListAsync();
            return Ok(meals);  // Return a successful response with the list of meals
        }

        // Get all cuisines, returning only their name and attribute
        [HttpGet("cuisine")]
        public async Task<ActionResult<List<object>>> GetAllCuisines()
        {
            var cuisines = await _context.Cuisines
                .Select(c => new { c.CuisineGroupedId, c.CuisineGrouped })  // Select only name and attribute
                .ToListAsync();
            return Ok(cuisines);
        }

        // Get all special considerations, returning only their name and attribute
        [HttpGet("special-consideration")]
        public async Task<ActionResult<List<object>>> GetAllSpecialConsiderations()
        {
            var specialConsiderations = await _context.SpecialConsiderations
                .Select(sc => new { sc.SpecialConsiderationId, sc.SpecialConsideration1 })  // Select only name and attribute
                .ToListAsync();
            return Ok(specialConsiderations);
        }
    }
}