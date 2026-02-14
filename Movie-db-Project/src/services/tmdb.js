const TMDB_BASE_URL = "https://api.themoviedb.org/3";

function getApiKey() {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing VITE_TMDB_API_KEY. Create a .env.local file (see .env.example).",
    );
  }
  return apiKey;
}

export function tmdbImageUrl(path, size = "w500") {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/${size}${path.startsWith("/") ? "" : "/"}${path}`;
}

export async function discoverMovies({ signal } = {}) {
  const apiKey = getApiKey();
  const url = new URL(`${TMDB_BASE_URL}/discover/movie`);
  url.searchParams.set("api_key", apiKey);

  const response = await fetch(url, { signal });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`TMDB request failed (${response.status}). ${text}`.trim());
  }

  const data = await response.json();
  return Array.isArray(data?.results) ? data.results : [];
}
