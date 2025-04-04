using food_webapp_backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace food_webapp_backend.Controllers;

public class AttributeController
{
    private readonly FoodContext _context;
    private readonly ILogger<AttributeController> _logger;


    public AttributeController(FoodContext context, ILogger<AttributeController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet("meal")]
    public async Task<ActionResult<List<Meal>>> GetMeal()
    {
        var meals = await _context.Meals.ToListAsync();
        return Ok(meals);  // Return a successful response with the list of meals
    }

}