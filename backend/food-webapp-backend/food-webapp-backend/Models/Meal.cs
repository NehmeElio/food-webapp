using System;
using System.Collections.Generic;

namespace food_webapp_backend.Models;

public partial class Meal
{
    public string? Meal1 { get; set; }

    public long MealId { get; set; }

    public virtual ICollection<RecipeMeal> RecipeMeals { get; set; } = new List<RecipeMeal>();
}
