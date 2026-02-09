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
      <section className="p-4">
        <p className="text-base">Recipe not found.</p>
        <Link className="text-blue-600" to="/">
          Back to home
        </Link>
      </section>
    );
  }

  return (
    <section className="p-4">
      <Link className="text-blue-600" to="/">
        Back
      </Link>

      <h1 className="text-2xl font-bold">{recipe.title}</h1>
      {recipe.image ? (
        <img className="shadow-sm" src={recipe.image} alt={recipe.title} />
      ) : (
        <div className="shadow-sm" aria-label="image" />
      )}

      {recipe.summary ? <p className="text-base">{recipe.summary}</p> : null}

      <h2 className="text-xl font-semibold">Ingredients</h2>
      <ul>
        {(recipe.ingredients ?? []).map((ingredient) => (
          <li className="text-base" key={ingredient}>
            {ingredient}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold">Instructions</h2>
      <ol>
        {(recipe.instructions ?? []).map((step) => (
          <li className="text-base" key={step}>
            {step}
          </li>
        ))}
      </ol>
    </section>
  );
}

export default RecipeDetail;
