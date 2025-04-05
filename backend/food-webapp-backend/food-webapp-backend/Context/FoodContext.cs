using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace food_webapp_backend.Models;

public partial class FoodContext : DbContext
{
    public FoodContext()
    {
    }

    public FoodContext(DbContextOptions<FoodContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cuisine> Cuisines { get; set; }

    public virtual DbSet<Ingredient> Ingredients { get; set; }

    public virtual DbSet<Meal> Meals { get; set; }

    public virtual DbSet<Recipe> Recipes { get; set; }

    public virtual DbSet<RecipeCuisine> RecipeCuisines { get; set; }

    public virtual DbSet<RecipeIngredient> RecipeIngredients { get; set; }

    public virtual DbSet<RecipeMeal> RecipeMeals { get; set; }

    public virtual DbSet<RecipeSpecial> RecipeSpecials { get; set; }

    public virtual DbSet<SpecialConsideration> SpecialConsiderations { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=aws-0-eu-west-3.pooler.supabase.com;Port=5432;Username=postgres.cbtuvrnhyrfyntbpmbsx;Password=elionehme2002;Database=postgres;SearchPath=public");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .HasPostgresEnum("auth", "aal_level", new[] { "aal1", "aal2", "aal3" })
            .HasPostgresEnum("auth", "code_challenge_method", new[] { "s256", "plain" })
            .HasPostgresEnum("auth", "factor_status", new[] { "unverified", "verified" })
            .HasPostgresEnum("auth", "factor_type", new[] { "totp", "webauthn", "phone" })
            .HasPostgresEnum("auth", "one_time_token_type", new[] { "confirmation_token", "reauthentication_token", "recovery_token", "email_change_token_new", "email_change_token_current", "phone_change_token" })
            .HasPostgresEnum("pgsodium", "key_status", new[] { "default", "valid", "invalid", "expired" })
            .HasPostgresEnum("pgsodium", "key_type", new[] { "aead-ietf", "aead-det", "hmacsha512", "hmacsha256", "auth", "shorthash", "generichash", "kdf", "secretbox", "secretstream", "stream_xchacha20" })
            .HasPostgresEnum("realtime", "action", new[] { "INSERT", "UPDATE", "DELETE", "TRUNCATE", "ERROR" })
            .HasPostgresEnum("realtime", "equality_op", new[] { "eq", "neq", "lt", "lte", "gt", "gte", "in" })
            .HasPostgresExtension("extensions", "pg_stat_statements")
            .HasPostgresExtension("extensions", "pgcrypto")
            .HasPostgresExtension("extensions", "pgjwt")
            .HasPostgresExtension("extensions", "uuid-ossp")
            .HasPostgresExtension("graphql", "pg_graphql")
            .HasPostgresExtension("pgsodium", "pgsodium")
            .HasPostgresExtension("vault", "supabase_vault");

        modelBuilder.Entity<Cuisine>(entity =>
        {
            entity.HasKey(e => e.CuisineGroupedId).HasName("cuisine_pkey");

            entity.ToTable("cuisine");

            entity.Property(e => e.CuisineGroupedId)
                .ValueGeneratedNever()
                .HasColumnName("cuisine_grouped_id");
            entity.Property(e => e.CuisineGrouped).HasColumnName("cuisine_grouped");
        });

        modelBuilder.Entity<Ingredient>(entity =>
        {
            entity.HasKey(e => e.IngredientId).HasName("ingredient_pkey");

            entity.ToTable("ingredient");

            entity.Property(e => e.IngredientId)
                .ValueGeneratedNever()
                .HasColumnName("ingredient_id");
            entity.Property(e => e.Ingredient1).HasColumnName("ingredient");
        });

        modelBuilder.Entity<Meal>(entity =>
        {
            entity.HasKey(e => e.MealId).HasName("meal_pkey");

            entity.ToTable("meal");

            entity.Property(e => e.MealId)
                .ValueGeneratedNever()
                .HasColumnName("meal_id");
            entity.Property(e => e.Meal1).HasColumnName("meal");
        });

        modelBuilder.Entity<Recipe>(entity =>
        {
            entity.HasKey(e => e.RecipeId).HasName("recipe_pkey");

            entity.ToTable("recipe");

            entity.Property(e => e.RecipeId)
                .ValueGeneratedNever()
                .HasColumnName("recipe_id");
            entity.Property(e => e.CookingTime).HasColumnName("cooking_time");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.ImageFilename).HasColumnName("image_filename");
            entity.Property(e => e.Instructions).HasColumnName("instructions");
            entity.Property(e => e.Servings).HasColumnName("servings");
            entity.Property(e => e.Title).HasColumnName("title");
        });

        modelBuilder.Entity<RecipeCuisine>(entity =>
        {
            entity.HasKey(e => e.RecipeCuisineId).HasName("recipe_cuisine_pkey");

            entity.ToTable("recipe_cuisine");

            entity.Property(e => e.RecipeCuisineId)
                .ValueGeneratedNever()
                .HasColumnName("recipe_cuisine_id");
            entity.Property(e => e.CuisineGroupedId).HasColumnName("cuisine_grouped_id");
            entity.Property(e => e.RecipeId).HasColumnName("recipe_id");

            entity.HasOne(d => d.CuisineGrouped).WithMany(p => p.RecipeCuisines)
                .HasForeignKey(d => d.CuisineGroupedId)
                .HasConstraintName("recipe_cuisine_cuisine_grouped_id_fkey");

            entity.HasOne(d => d.Recipe).WithMany(p => p.RecipeCuisines)
                .HasForeignKey(d => d.RecipeId)
                .HasConstraintName("recipe_cuisine_recipe_id_fkey");
        });

        modelBuilder.Entity<RecipeIngredient>(entity =>
        {
            entity.HasKey(e => e.RecipeIngredientId).HasName("recipe_ingredient_pkey");

            entity.ToTable("recipe_ingredient");

            entity.Property(e => e.RecipeIngredientId)
                .ValueGeneratedNever()
                .HasColumnName("recipe_ingredient_id");
            entity.Property(e => e.IngredientId).HasColumnName("ingredient_id");
            entity.Property(e => e.RecipeId).HasColumnName("recipe_id");

            entity.HasOne(d => d.Ingredient).WithMany(p => p.RecipeIngredients)
                .HasForeignKey(d => d.IngredientId)
                .HasConstraintName("recipe_ingredient_ingredient_id_fkey");

            entity.HasOne(d => d.Recipe).WithMany(p => p.RecipeIngredients)
                .HasForeignKey(d => d.RecipeId)
                .HasConstraintName("recipe_ingredient_recipe_id_fkey");
        });

        modelBuilder.Entity<RecipeMeal>(entity =>
        {
            entity.HasKey(e => e.RecipeMealId).HasName("recipe_meal_pkey");

            entity.ToTable("recipe_meal");

            entity.Property(e => e.RecipeMealId)
                .ValueGeneratedNever()
                .HasColumnName("recipe_meal_id");
            entity.Property(e => e.MealId).HasColumnName("meal_id");
            entity.Property(e => e.RecipeId).HasColumnName("recipe_id");

            entity.HasOne(d => d.Meal).WithMany(p => p.RecipeMeals)
                .HasForeignKey(d => d.MealId)
                .HasConstraintName("recipe_meal_meal_id_fkey");

            entity.HasOne(d => d.Recipe).WithMany(p => p.RecipeMeals)
                .HasForeignKey(d => d.RecipeId)
                .HasConstraintName("recipe_meal_recipe_id_fkey");
        });

        modelBuilder.Entity<RecipeSpecial>(entity =>
        {
            entity.HasKey(e => e.RecipeSpecialId).HasName("recipe_special_pkey");

            entity.ToTable("recipe_special");

            entity.Property(e => e.RecipeSpecialId)
                .ValueGeneratedNever()
                .HasColumnName("recipe_special_id");
            entity.Property(e => e.RecipeId).HasColumnName("recipe_id");
            entity.Property(e => e.SpecialConsiderationId).HasColumnName("special_consideration_id");

            entity.HasOne(d => d.Recipe).WithMany(p => p.RecipeSpecials)
                .HasForeignKey(d => d.RecipeId)
                .HasConstraintName("recipe_special_recipe_id_fkey");

            entity.HasOne(d => d.SpecialConsideration).WithMany(p => p.RecipeSpecials)
                .HasForeignKey(d => d.SpecialConsiderationId)
                .HasConstraintName("recipe_special_special_consideration_id_fkey");
        });

        modelBuilder.Entity<SpecialConsideration>(entity =>
        {
            entity.HasKey(e => e.SpecialConsiderationId).HasName("special_consideration_pkey");

            entity.ToTable("special_consideration");

            entity.Property(e => e.SpecialConsiderationId)
                .ValueGeneratedNever()
                .HasColumnName("special_consideration_id");
            entity.Property(e => e.SpecialConsideration1).HasColumnName("special-consideration");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
