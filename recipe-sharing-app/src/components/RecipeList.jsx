import useRecipeStore from "./recipeStore";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.filteredRecipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);

  return (
    <div className="recipe-list">
      {recipes.length === 0 ? <p>No recipes found.</p> : null}
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-item">
          <h3>
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </h3>
          <p>{recipe.description}</p>
          <div className="recipe-actions">
            <button type="button" onClick={() => toggleFavorite(recipe.id)}>
              {favorites.some((id) => String(id) === String(recipe.id))
                ? "Remove favorite"
                : "Add to favorites"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
