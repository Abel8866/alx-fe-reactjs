import { Link, useParams } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const RecipeDetails = () => {
  const { id } = useParams();

  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => String(r.id) === String(id)),
  );

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
    </div>
  );
};

export default RecipeDetails;
