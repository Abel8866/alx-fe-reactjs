import { useEffect, useState } from "react";

import recipesData from "../data.json";

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipesData);
  }, []);

  return (
    <main className="mx-auto max-w-6xl p-4">
      <h1 className="text-2xl font-bold">Recipe Sharing Platform</h1>
      <p className="mt-1 text-sm text-gray-600">
        Browse recipes and find something new to cook.
      </p>

      <section className="mt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <article
              key={recipe.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="h-40 w-full object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{recipe.title}</h2>
                <p className="mt-2 text-sm text-gray-600">{recipe.summary}</p>
              </div>
            </article>
          ))}
        </div>

        {recipes.length === 0 && (
          <p className="mt-6 text-sm text-gray-600">No recipes found.</p>
        )}
      </section>
    </main>
  );
}

export default HomePage;
