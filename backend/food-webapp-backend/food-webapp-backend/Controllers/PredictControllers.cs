using food_webapp_backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace food_webapp_backend.Controllers;

[ApiController]
[Route("[controller]")]
public class PredictControllers
{
    private readonly ILogger<PredictControllers> _logger;
    private readonly FoodContext _context;

    public PredictControllers(ILogger<PredictControllers> logger, FoodContext context)
    {
        _logger = logger;
        _context = context;
    }
    
    [HttpGet(Name = "GetRecipe")]
    public IEnumerable<Recipe> Get()
    {
        return _context.Recipes.ToList();
    }
}