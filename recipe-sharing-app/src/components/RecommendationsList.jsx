import React from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const favorites = useRecipeStore((state) => state.favorites);
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);

  return (
    <section className="panel">
      <h2>Recommendations</h2>
      {recommendations.length === 0 ? <p>No recommendations yet.</p> : null}
      <div className="panel-list">
        {recommendations.map((recipe) => {
          const isFavorite = favorites.some(
            (id) => String(id) === String(recipe.id),
          );

          return (
            <div key={recipe.id} className="panel-item">
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
              <button type="button" onClick={() => toggleFavorite(recipe.id)}>
                {isFavorite ? "Unfavorite" : "Favorite"}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecommendationsList;
