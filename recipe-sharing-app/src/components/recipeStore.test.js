import { describe, expect, it, beforeEach } from "vitest";
import { useRecipeStore } from "./recipeStore";

const resetStore = () => {
  useRecipeStore.setState((state) => ({
    ...state,
    recipes: [],
    searchTerm: "",
    filteredRecipes: [],
  }));
};

describe("recipeStore filtering", () => {
  beforeEach(() => {
    resetStore();
  });

  it("sets filteredRecipes to all recipes when searchTerm is empty", () => {
    const { setRecipes } = useRecipeStore.getState();

    const recipes = [
      { id: 1, title: "Chocolate Cake", description: "Rich" },
      { id: 2, title: "Pasta", description: "Quick" },
    ];

    setRecipes(recipes);

    expect(useRecipeStore.getState().filteredRecipes).toEqual(recipes);
  });

  it("filters by title case-insensitively and trims whitespace", () => {
    const { setRecipes, setSearchTerm } = useRecipeStore.getState();

    setRecipes([
      { id: 1, title: "Chocolate Cake", description: "Rich" },
      { id: 2, title: "Pasta", description: "Quick" },
      { id: 3, title: "Vanilla cupcake", description: "Sweet" },
    ]);

    setSearchTerm("  CAKE ");

    const titles = useRecipeStore
      .getState()
      .filteredRecipes.map((r) => r.title);

    expect(titles).toEqual(["Chocolate Cake"]);
  });

  it("keeps filteredRecipes in sync when recipes change", () => {
    const { setRecipes, setSearchTerm, updateRecipe, deleteRecipe } =
      useRecipeStore.getState();

    setRecipes([
      { id: 1, title: "Soup", description: "Warm" },
      { id: 2, title: "Salad", description: "Fresh" },
    ]);

    setSearchTerm("sal");
    expect(useRecipeStore.getState().filteredRecipes.map((r) => r.id)).toEqual([
      2,
    ]);

    updateRecipe({ id: 1, title: "Salmon Soup" });
    expect(useRecipeStore.getState().filteredRecipes.map((r) => r.id)).toEqual([
      1, 2,
    ]);

    deleteRecipe(2);
    expect(useRecipeStore.getState().filteredRecipes.map((r) => r.id)).toEqual([
      1,
    ]);
  });
});
