import { create } from "zustand";

const computeFilteredRecipes = (recipes, searchTerm) => {
  const normalizedTerm = (searchTerm ?? "").trim().toLowerCase();
  if (!normalizedTerm) return recipes;

  return recipes.filter((recipe) =>
    (recipe?.title ?? "").toLowerCase().includes(normalizedTerm),
  );
};

export const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: "",
  filteredRecipes: [],
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
      filteredRecipes: computeFilteredRecipes(
        [...state.recipes, newRecipe],
        state.searchTerm,
      ),
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

export default useRecipeStore;
