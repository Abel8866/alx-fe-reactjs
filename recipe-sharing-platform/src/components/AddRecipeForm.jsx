import { useMemo, useState } from "react";

function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const [submitAttempted, setSubmitAttempted] = useState(false);

  const ingredientItems = useMemo(() => {
    return ingredients
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }, [ingredients]);

  const errors = useMemo(() => {
    const nextErrors = {};

    if (!title.trim()) nextErrors.title = "Title is required.";
    if (!ingredients.trim()) {
      nextErrors.ingredients = "Ingredients are required.";
    } else if (ingredientItems.length < 2) {
      nextErrors.ingredients = "Please enter at least two ingredients.";
    }
    if (!steps.trim()) nextErrors.steps = "Preparation steps are required.";

    return nextErrors;
  }, [title, ingredients, steps, ingredientItems.length]);

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitAttempted(true);

    if (!isValid) return;

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="recipe-title">Recipe Title</label>
        <input
          id="recipe-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {submitAttempted && errors.title ? <p>{errors.title}</p> : null}
      </div>

      <div>
        <label htmlFor="recipe-ingredients">Ingredients</label>
        <textarea
          id="recipe-ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients, one per line"
          rows={6}
        />
        {submitAttempted && errors.ingredients ? (
          <p>{errors.ingredients}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="recipe-steps">Preparation Steps</label>
        <textarea
          id="recipe-steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          placeholder="Enter steps, one per line"
          rows={6}
        />
        {submitAttempted && errors.steps ? <p>{errors.steps}</p> : null}
      </div>

      <button type="submit" disabled={!isValid && submitAttempted}>
        Submit Recipe
      </button>
    </form>
  );
}

export default AddRecipeForm;
