import { Link, useParams } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const RecipeDetails = () => {
  const { id } = useParams();

  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => String(r.id) === String(id)),
  );

  const favorites = useRecipeStore((state) => state.favorites);
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);

  if (!recipe) {
    return (
      <div>
        <p>Recipe not found.</p>
        <Link to="/">Back to recipes</Link>
      </div>
    );
  }

  return (
    <div>
      <p>
        <Link to="/">← Back</Link>
      </p>
      <p>Recipe ID: {recipe.id}</p>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <p>
        <button type="button" onClick={() => toggleFavorite(recipe.id)}>
          {favorites.some((fid) => String(fid) === String(recipe.id))
            ? "Remove favorite"
            : "Add to favorites"}
        </button>
      </p>
    </div>
  );
};

export default RecipeDetails;
