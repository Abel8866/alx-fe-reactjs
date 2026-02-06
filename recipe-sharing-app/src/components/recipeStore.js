import { create } from "zustand";

const computeFilteredRecipes = (recipes, searchTerm) => {
  const normalizedTerm = (searchTerm ?? "").trim().toLowerCase();
  if (!normalizedTerm) return recipes;

  return recipes.filter((recipe) =>
    (recipe?.title ?? "").toLowerCase().includes(normalizedTerm),
  );
};

const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: "",
  filteredRecipes: [],
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id
          ? { ...recipe, ...updatedRecipe }
          : recipe,
      ),
    })),
  deleteRecipe: (recipeId) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
    })),
  setRecipes: (recipes) =>
    set((state) => ({
      recipes,
      filteredRecipes: computeFilteredRecipes(recipes, state.searchTerm),
    })),

  setSearchTerm: (term) =>
    set((state) => ({
      searchTerm: term,
      filteredRecipes: computeFilteredRecipes(state.recipes, term),
    })),
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: computeFilteredRecipes(state.recipes, state.searchTerm),
    })),
}));

export { useRecipeStore };
export default useRecipeStore;
