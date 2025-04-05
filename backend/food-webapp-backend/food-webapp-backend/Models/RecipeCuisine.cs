using System;
using System.Collections.Generic;

namespace food_webapp_backend.Models;

public partial class RecipeCuisine
{
    public long RecipeCuisineId { get; set; }

    public long? RecipeId { get; set; }

    public long? CuisineGroupedId { get; set; }

    public virtual Cuisine? CuisineGrouped { get; set; }

    public virtual Recipe? Recipe { get; set; }
}
