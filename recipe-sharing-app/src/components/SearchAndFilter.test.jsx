import React from "react";
import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import { useRecipeStore } from "./recipeStore";
import SearchBar from "./SearchBar";
import RecipeList from "./RecipeList";

const resetStore = () => {
  useRecipeStore.setState((state) => ({
    ...state,
    recipes: [],
    searchTerm: "",
    filteredRecipes: [],
  }));
};

describe("SearchBar + RecipeList integration", () => {
  beforeEach(() => {
    resetStore();

    useRecipeStore.getState().setRecipes([
      { id: 1, title: "Chocolate Cake", description: "Rich" },
      { id: 2, title: "Pasta", description: "Quick" },
      { id: 3, title: "Vanilla Cupcake", description: "Sweet" },
    ]);
  });

  it("filters results as the user types", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <SearchBar />
        <RecipeList />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Chocolate Cake/i)).toBeInTheDocument();
    expect(screen.getByText(/Pasta/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/search recipes/i), "cake");

    expect(screen.getByText(/Chocolate Cake/i)).toBeInTheDocument();
    expect(screen.queryByText(/Pasta/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Vanilla Cupcake/i)).toBeInTheDocument();
  });

  it("clearing the search shows all recipes again", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <SearchBar />
        <RecipeList />
      </MemoryRouter>,
    );

    const input = screen.getByLabelText(/search recipes/i);

    await user.type(input, "pasta");
    expect(screen.getByText(/Pasta/i)).toBeInTheDocument();
    expect(screen.queryByText(/Chocolate Cake/i)).not.toBeInTheDocument();

    await user.clear(input);

    expect(screen.getByText(/Chocolate Cake/i)).toBeInTheDocument();
    expect(screen.getByText(/Pasta/i)).toBeInTheDocument();
    expect(screen.getByText(/Vanilla Cupcake/i)).toBeInTheDocument();
  });
});
