import { useMemo, useState } from "react";

function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [errors, setErrors] = useState({});

  const ingredientItems = useMemo(() => {
    return ingredients
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }, [ingredients]);

  const validate = () => {
    const nextErrors = {};

    if (!title.trim()) nextErrors.title = "Title is required.";
    if (!ingredients.trim()) {
      nextErrors.ingredients = "Ingredients are required.";
    } else if (ingredientItems.length < 2) {
      nextErrors.ingredients = "Please enter at least two ingredients.";
    }
    if (!steps.trim()) nextErrors.steps = "Preparation steps are required.";

    setErrors(nextErrors);
    return nextErrors;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitAttempted(true);

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) return;

    // Placeholder “submit”: in later steps you can wire this into state/store/API.
    const payload = {
      title: title.trim(),
      ingredients: ingredientItems,
      instructions: steps
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean),
    };

    // eslint-disable-next-line no-console
    console.log("New recipe:", payload);

    setTitle("");
    setIngredients("");
    setSteps("");
    setSubmitAttempted(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-3xl p-4 sm:p-6 md:p-8 lg:p-8">
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-4 sm:p-6">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Add a Recipe
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Fill out all fields to submit your recipe.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 p-4 sm:p-6">
            <div>
              <label
                htmlFor="recipe-title"
                className="block text-sm font-medium text-gray-900"
              >
                Recipe Title
              </label>
              <input
                id="recipe-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`mt-2 w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                  submitAttempted && errors.title
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-200 focus:ring-blue-200"
                }`}
                placeholder="e.g., Spaghetti Carbonara"
              />
              {submitAttempted && errors.title ? (
                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="recipe-ingredients"
                className="block text-sm font-medium text-gray-900"
              >
                Ingredients
              </label>
              <textarea
                id="recipe-ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter ingredients, one per line"
                rows={6}
                className={`mt-2 w-full resize-y rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                  submitAttempted && errors.ingredients
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-200 focus:ring-blue-200"
                }`}
              />
              <p className="mt-2 text-xs text-gray-500">
                Tip: add at least two ingredients (one per line).
              </p>
              {submitAttempted && errors.ingredients ? (
                <p className="mt-2 text-sm text-red-600">
                  {errors.ingredients}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="recipe-steps"
                className="block text-sm font-medium text-gray-900"
              >
                Preparation Steps
              </label>
              <textarea
                id="recipe-steps"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder="Enter steps, one per line"
                rows={6}
                className={`mt-2 w-full resize-y rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                  submitAttempted && errors.steps
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-200 focus:ring-blue-200"
                }`}
              />
              {submitAttempted && errors.steps ? (
                <p className="mt-2 text-sm text-red-600">{errors.steps}</p>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              {!isValid && submitAttempted ? (
                <p className="text-sm text-red-600">
                  Please fix the errors above.
                </p>
              ) : (
                <span />
              )}
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-blue-300 sm:w-auto"
                disabled={!isValid}
              >
                Submit Recipe
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AddRecipeForm;
