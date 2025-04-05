using System;
using System.Collections.Generic;

namespace food_webapp_backend.Models;

public partial class Cuisine
{
    public string? CuisineGrouped { get; set; }

    public long CuisineGroupedId { get; set; }

    public virtual ICollection<RecipeCuisine> RecipeCuisines { get; set; } = new List<RecipeCuisine>();
}
