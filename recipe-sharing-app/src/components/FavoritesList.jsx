import React from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const FavoritesList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.some((id) => String(id) === String(recipe.id)),
  );

  return (
    <section className="panel">
      <h2>Favorites</h2>
      {favoriteRecipes.length === 0 ? <p>No favorites yet.</p> : null}
      <div className="panel-list">
        {favoriteRecipes.map((recipe) => (
          <div key={recipe.id} className="panel-item">
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            <button type="button" onClick={() => removeFavorite(recipe.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FavoritesList;
