using System;
using System.Collections.Generic;

namespace food_webapp_backend.Models;

public partial class RecipeSpecial
{
    public long RecipeSpecialId { get; set; }

    public long? RecipeId { get; set; }

    public long? SpecialConsiderationId { get; set; }

    public virtual Recipe? Recipe { get; set; }

    public virtual SpecialConsideration? SpecialConsideration { get; set; }
}
