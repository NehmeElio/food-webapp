using System;
using System.Collections.Generic;

namespace food_webapp_backend.Models;

public partial class Recipe
{
    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Instructions { get; set; }

    public string? CookingTime { get; set; }

    public string? Servings { get; set; }

    public byte[]? ImageFilename { get; set; }

    public long RecipeId { get; set; }

    public virtual ICollection<RecipeCuisine> RecipeCuisines { get; set; } = new List<RecipeCuisine>();

    public virtual ICollection<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>();

    public virtual ICollection<RecipeMeal> RecipeMeals { get; set; } = new List<RecipeMeal>();

    public virtual ICollection<RecipeSpecial> RecipeSpecials { get; set; } = new List<RecipeSpecial>();
}
