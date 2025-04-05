using System;
using System.Collections.Generic;

namespace food_webapp_backend.Models;

public partial class RecipeMeal
{
    public long RecipeMealId { get; set; }

    public long? RecipeId { get; set; }

    public long? MealId { get; set; }

    public virtual Meal? Meal { get; set; }

    public virtual Recipe? Recipe { get; set; }
}
