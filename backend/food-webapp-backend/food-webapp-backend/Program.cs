using food_webapp_backend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddSwaggerGen();
// Get the connection string from your configuration (e.g., appsettings.json)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Add the DbContext to the DI container
builder.Services.AddDbContext<FoodContext>(options =>
    options.UseNpgsql(connectionString)
);
var app = builder.Build();

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