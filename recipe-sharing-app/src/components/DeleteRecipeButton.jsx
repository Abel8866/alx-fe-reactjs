import { useNavigate, useParams } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const DeleteRecipeButton = ({ recipeId }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = () => {
    const idToDelete = recipeId ?? id;
    if (!idToDelete) return;

    deleteRecipe(idToDelete);
    navigate("/");
  };

  return (
    <button type="button" onClick={handleDelete}>
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
