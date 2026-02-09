import { useEffect, useState } from "react";

import recipesData from "../data.json";

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipesData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Recipe Sharing Platform
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
          Browse recipes and find something new to cook.
        </p>

        <section className="mt-6 sm:mt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <article
                key={recipe.id}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="h-44 w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {recipe.title}
                  </h2>
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
    </div>
  );
}

export default HomePage;
