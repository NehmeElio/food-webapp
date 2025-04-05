using System;
using System.Collections.Generic;

namespace food_webapp_backend.Models;

public partial class SpecialConsideration
{
    public string? SpecialConsideration1 { get; set; }

    public long SpecialConsiderationId { get; set; }

    public virtual ICollection<RecipeSpecial> RecipeSpecials { get; set; } = new List<RecipeSpecial>();
}
