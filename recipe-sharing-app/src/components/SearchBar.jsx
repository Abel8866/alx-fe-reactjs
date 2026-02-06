import React from "react";
import { useRecipeStore } from "./recipeStore";

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  return (
    <div className="search-row">
      <input
        type="text"
        placeholder="Search recipes..."
        aria-label="Search recipes"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="button"
        onClick={() => setSearchTerm("")}
        disabled={!searchTerm}
      >
        Reset
      </button>
    </div>
  );
};

export default SearchBar;
