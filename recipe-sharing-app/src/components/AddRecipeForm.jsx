import { useState } from "react";
import useRecipeStore from "./recipeStore";

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const isValid = title.trim().length > 0 && description.trim().length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) return;

    addRecipe({
      id: Date.now(),
      title: trimmedTitle,
      description: trimmedDescription,
    });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <button type="submit" disabled={!isValid}>
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;
