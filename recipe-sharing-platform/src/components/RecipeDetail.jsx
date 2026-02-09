import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import data from "../data.json";

function RecipeDetail() {
  const { id } = useParams();
  const recipeId = useMemo(() => Number(id), [id]);

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const foundRecipe = data.find((item) => item.id === recipeId) ?? null;
    setRecipe(foundRecipe);
  }, [recipeId]);

  if (!recipe) {
    return (
      <section>
        <p>Recipe not found.</p>
        <Link to="/">Back to home</Link>
      </section>
    );
  }

  return (
    <section>
      <Link to="/">Back</Link>

      <h1>{recipe.title}</h1>
      {recipe.image ? (
        <img src={recipe.image} alt={recipe.title} />
      ) : (
        <div aria-label="image" />
      )}

      {recipe.summary ? <p>{recipe.summary}</p> : null}

      <h2>Ingredients</h2>
      <ul>
        {(recipe.ingredients ?? []).map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <ol>
        {(recipe.instructions ?? []).map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
  );
}

export default RecipeDetail;
