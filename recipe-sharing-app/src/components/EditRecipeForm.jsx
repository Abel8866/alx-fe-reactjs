import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const EditRecipeForm = ({ recipe }) => {
  const { id } = useParams();

  const recipes = useRecipeStore((state) => state.recipes);
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const recipeFromStore = recipes.find((r) => String(r.id) === String(id));
  const currentRecipe = recipe ?? recipeFromStore;

  const [title, setTitle] = useState(currentRecipe?.title ?? "");
  const [description, setDescription] = useState(
    currentRecipe?.description ?? "",
  );

  useEffect(() => {
    setTitle(currentRecipe?.title ?? "");
    setDescription(currentRecipe?.description ?? "");
  }, [currentRecipe?.title, currentRecipe?.description]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!currentRecipe) return;

    updateRecipe({
      id: currentRecipe.id,
      title,
      description,
    });
  };

  if (!currentRecipe) return null;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditRecipeForm;
