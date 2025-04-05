using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace food_webapp_backend.DTO;

public class AddRecipeDto
    {
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(100, ErrorMessage = "Title can't be longer than 100 characters.")]
        public string? Title { get; set; }
        
        public string? Description { get; set; }
        
        [JsonFormat]  // Custom validation to ensure JSON format
        public string? Instructions { get; set; }
        
        public string? CookingTime { get; set; }

        public string? Servings { get; set; }

        public byte[]? ImageFilename { get; set; }
        

// Lists for many-to-many relationships
        public List<long> MealIds { get; set; } = new List<long>();
        public List<long> IngredientIds { get; set; } = new List<long>();
        public List<long> CuisineIds { get; set; } = new List<long>();
        public List<long> SpecialIds { get; set; } = new List<long>();
    }

    // Custom Validation Attribute for JSON Format
    public class JsonFormatAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            if (value == null)
                return false;

            try
            {
                var parsed = JsonConvert.DeserializeObject(value.ToString() ?? string.Empty);
                return parsed != null;
            }
            catch
            {
                return false;
            }
        }

        public override string FormatErrorMessage(string name)
        {
            return $"{name} must be in valid JSON format.";
        }
    }