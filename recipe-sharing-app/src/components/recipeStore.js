import { create } from "zustand";

const computeFilteredRecipes = (recipes, searchTerm) => {
  const normalizedTerm = (searchTerm ?? "").trim().toLowerCase();
  if (!normalizedTerm) return recipes;

  return recipes.filter((recipe) =>
    (recipe?.title ?? "").toLowerCase().includes(normalizedTerm),
  );
};

const sameId = (a, b) => String(a) === String(b);

const computeRecommendations = (recipes, favorites, limit = 5) => {
  const favoriteIdSet = new Set((favorites ?? []).map((id) => String(id)));
  const candidates = (recipes ?? []).filter(
    (recipe) => !favoriteIdSet.has(String(recipe?.id)),
  );
  return candidates.slice(0, limit);
};

const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: "",
  filteredRecipes: [],
  favorites: [],
  recommendations: [],
  addRecipe: (newRecipe) =>
    set((state) => {
      const title = (newRecipe?.title ?? "").trim();
      const description = (newRecipe?.description ?? "").trim();
      if (!title || !description) return state;

      const normalizedRecipe = { ...newRecipe, title, description };
      const nextRecipes = [...state.recipes, normalizedRecipe];
      return {
        recipes: nextRecipes,
        filteredRecipes: computeFilteredRecipes(nextRecipes, state.searchTerm),
        recommendations: computeRecommendations(nextRecipes, state.favorites),
      };
    }),
  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const nextRecipes = state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id
          ? { ...recipe, ...updatedRecipe }
          : recipe,
      );
      return {
        recipes: nextRecipes,
        filteredRecipes: computeFilteredRecipes(nextRecipes, state.searchTerm),
        recommendations: computeRecommendations(nextRecipes, state.favorites),
      };
    }),
  deleteRecipe: (recipeId) =>
    set((state) => {
      const nextRecipes = state.recipes.filter(
        (recipe) => recipe.id !== recipeId,
      );

      const nextFavorites = state.favorites.filter(
        (id) => !sameId(id, recipeId),
      );

      return {
        recipes: nextRecipes,
        favorites: nextFavorites,
        filteredRecipes: computeFilteredRecipes(nextRecipes, state.searchTerm),
        recommendations: computeRecommendations(nextRecipes, nextFavorites),
      };
    }),
  setRecipes: (recipes) =>
    set((state) => {
      const recipeIdSet = new Set((recipes ?? []).map((r) => String(r?.id)));
      const nextFavorites = state.favorites.filter((id) =>
        recipeIdSet.has(String(id)),
      );

      return {
        recipes,
        favorites: nextFavorites,
        filteredRecipes: computeFilteredRecipes(recipes, state.searchTerm),
        recommendations: computeRecommendations(recipes, nextFavorites),
      };
    }),

  setSearchTerm: (term) =>
    set((state) => ({
      searchTerm: term,
      filteredRecipes: computeFilteredRecipes(state.recipes, term),
    })),
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: computeFilteredRecipes(state.recipes, state.searchTerm),
    })),

  addFavorite: (recipeId) =>
    set((state) => {
      const alreadyFavorite = state.favorites.some((id) =>
        sameId(id, recipeId),
      );
      if (alreadyFavorite) return state;
      const nextFavorites = [...state.favorites, recipeId];
      return {
        favorites: nextFavorites,
        recommendations: computeRecommendations(state.recipes, nextFavorites),
      };
    }),
  removeFavorite: (recipeId) =>
    set((state) => {
      const nextFavorites = state.favorites.filter(
        (id) => !sameId(id, recipeId),
      );
      return {
        favorites: nextFavorites,
        recommendations: computeRecommendations(state.recipes, nextFavorites),
      };
    }),
  toggleFavorite: (recipeId) =>
    set((state) => {
      const alreadyFavorite = state.favorites.some((id) =>
        sameId(id, recipeId),
      );
      const nextFavorites = alreadyFavorite
        ? state.favorites.filter((id) => !sameId(id, recipeId))
        : [...state.favorites, recipeId];

      return {
        favorites: nextFavorites,
        recommendations: computeRecommendations(state.recipes, nextFavorites),
      };
    }),
}));

export { useRecipeStore };
export default useRecipeStore;
