import { create } from "zustand";

const computeFilteredRecipes = (recipes, searchTerm) => {
  const normalizedTerm = (searchTerm ?? "").trim().toLowerCase();
  if (!normalizedTerm) return recipes;

  return recipes.filter((recipe) =>
    (recipe?.title ?? "").toLowerCase().includes(normalizedTerm),
  );
};

const sameId = (a, b) => String(a) === String(b);

const computeRecommendations = (recipes, favoriteIds, limit = 5) => {
  const favoriteIdSet = new Set((favoriteIds ?? []).map((id) => String(id)));
  const candidates = (recipes ?? []).filter(
    (recipe) => !favoriteIdSet.has(String(recipe?.id)),
  );
  return candidates.slice(0, limit);
};

const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: "",
  filteredRecipes: [],
  favoriteIds: [],
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
        recommendations: computeRecommendations(nextRecipes, state.favoriteIds),
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
        recommendations: computeRecommendations(nextRecipes, state.favoriteIds),
      };
    }),
  deleteRecipe: (recipeId) =>
    set((state) => {
      const nextRecipes = state.recipes.filter(
        (recipe) => recipe.id !== recipeId,
      );

      const nextFavoriteIds = state.favoriteIds.filter(
        (id) => !sameId(id, recipeId),
      );

      return {
        recipes: nextRecipes,
        favoriteIds: nextFavoriteIds,
        filteredRecipes: computeFilteredRecipes(nextRecipes, state.searchTerm),
        recommendations: computeRecommendations(nextRecipes, nextFavoriteIds),
      };
    }),
  setRecipes: (recipes) =>
    set((state) => {
      const recipeIdSet = new Set((recipes ?? []).map((r) => String(r?.id)));
      const nextFavoriteIds = state.favoriteIds.filter((id) =>
        recipeIdSet.has(String(id)),
      );

      return {
        recipes,
        favoriteIds: nextFavoriteIds,
        filteredRecipes: computeFilteredRecipes(recipes, state.searchTerm),
        recommendations: computeRecommendations(recipes, nextFavoriteIds),
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
      const alreadyFavorite = state.favoriteIds.some((id) =>
        sameId(id, recipeId),
      );
      if (alreadyFavorite) return state;
      const nextFavoriteIds = [...state.favoriteIds, recipeId];
      return {
        favoriteIds: nextFavoriteIds,
        recommendations: computeRecommendations(state.recipes, nextFavoriteIds),
      };
    }),
  removeFavorite: (recipeId) =>
    set((state) => {
      const nextFavoriteIds = state.favoriteIds.filter(
        (id) => !sameId(id, recipeId),
      );
      return {
        favoriteIds: nextFavoriteIds,
        recommendations: computeRecommendations(state.recipes, nextFavoriteIds),
      };
    }),
  toggleFavorite: (recipeId) =>
    set((state) => {
      const alreadyFavorite = state.favoriteIds.some((id) =>
        sameId(id, recipeId),
      );
      const nextFavoriteIds = alreadyFavorite
        ? state.favoriteIds.filter((id) => !sameId(id, recipeId))
        : [...state.favoriteIds, recipeId];

      return {
        favoriteIds: nextFavoriteIds,
        recommendations: computeRecommendations(state.recipes, nextFavoriteIds),
      };
    }),
}));

export { useRecipeStore };
export default useRecipeStore;
