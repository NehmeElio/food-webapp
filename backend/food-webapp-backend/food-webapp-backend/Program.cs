using DotNetEnv;
using food_webapp_backend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddSwaggerGen();
// Get the connection string from your configuration (e.g., appsettings.json)
// Get the connection string from the configuration and replace the password placeholder
// Get the connection string from the configuration and replace the password placeholder
// Load environment variables from the .env file
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<FoodContext>((serviceProvider, options) =>
{
    options.UseNpgsql(connectionString);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        policy => policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("AllowAllOrigins");  // E

// Configure the HTTP request pipeline.
{
    // Enable Swagger only in the development environment
    app.UseSwagger();

    // Enable the Swagger UI page to browse the API
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();