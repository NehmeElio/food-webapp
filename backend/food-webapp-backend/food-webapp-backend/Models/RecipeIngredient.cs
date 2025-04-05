using System;
using System.Collections.Generic;

namespace food_webapp_backend.Models;

public partial class RecipeIngredient
{
    public long RecipeIngredientId { get; set; }

    public long? RecipeId { get; set; }

    public long? IngredientId { get; set; }

    public virtual Ingredient? Ingredient { get; set; }

    public virtual Recipe? Recipe { get; set; }
}
