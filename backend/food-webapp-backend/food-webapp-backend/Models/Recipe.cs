using System;
using System.Collections.Generic;

namespace food_webapp_backend.Models;

public partial class Recipe
{
    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Ingredients { get; set; }

    public string? Instructions { get; set; }

    public string? CookingTime { get; set; }

    public string? Servings { get; set; }

    public string? Ratings { get; set; }

    public string? ImageFilename { get; set; }

    public string? Type { get; set; }

    public string? Technique { get; set; }

    public string? Equipment { get; set; }

    public string? Occasion { get; set; }

    public long RecipeId { get; set; }
}
