export const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export function getTmdbApiKey() {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing TMDB API key. Add VITE_TMDB_API_KEY to a .env file in the project root.",
    );
  }

  return apiKey;
}
