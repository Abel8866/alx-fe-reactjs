const TMDB_BASE_URL = "https://api.themoviedb.org/3";

let cachedMovieGenreMapPromise;

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

export async function discoverMoviesPage({ signal, page = 1 } = {}) {
  const apiKey = getApiKey();

  const pageNumber = Number.isFinite(Number(page)) ? Number(page) : 1;

  const url = new URL(`${TMDB_BASE_URL}/discover/movie`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("page", String(pageNumber));
  url.searchParams.set("include_adult", "false");

  const response = await fetch(url, { signal });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`TMDB request failed (${response.status}). ${text}`.trim());
  }

  const data = await response.json();
  return {
    results: Array.isArray(data?.results) ? data.results : [],
    page: typeof data?.page === "number" ? data.page : pageNumber,
    totalPages: typeof data?.total_pages === "number" ? data.total_pages : 1,
  };
}

export async function discoverMovies({ signal, page = 1, pages = 1 } = {}) {
  const apiKey = getApiKey();

  const startPage = Number.isFinite(Number(page)) ? Number(page) : 1;
  const requestedPages = Number.isFinite(Number(pages)) ? Number(pages) : 1;

  // Avoid creating too many parallel requests (rate limits / slow loads).
  const pageCount = Math.max(1, Math.min(10, Math.floor(requestedPages)));

  const requests = Array.from({ length: pageCount }, (_, index) => {
    const url = new URL(`${TMDB_BASE_URL}/discover/movie`);
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("page", String(startPage + index));
    url.searchParams.set("include_adult", "false");

    return fetch(url, { signal }).then(async (response) => {
      if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(
          `TMDB request failed (${response.status}). ${text}`.trim(),
        );
      }
      return response.json();
    });
  });

  const pagesData = await Promise.all(requests);

  const seenIds = new Set();
  const mergedResults = [];

  for (const data of pagesData) {
    const results = Array.isArray(data?.results) ? data.results : [];
    for (const movie of results) {
      const id = movie?.id;
      if (!id || seenIds.has(id)) continue;
      seenIds.add(id);
      mergedResults.push(movie);
    }
  }

  return mergedResults;
}

export async function getMovieGenreMap() {
  if (cachedMovieGenreMapPromise) return cachedMovieGenreMapPromise;

  cachedMovieGenreMapPromise = (async () => {
    const apiKey = getApiKey();
    const url = new URL(`${TMDB_BASE_URL}/genre/movie/list`);
    url.searchParams.set("api_key", apiKey);

    const response = await fetch(url);
    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(
        `TMDB genres request failed (${response.status}). ${text}`.trim(),
      );
    }

    const data = await response.json();
    const genres = Array.isArray(data?.genres) ? data.genres : [];

    return genres.reduce((acc, genre) => {
      if (genre?.id && genre?.name) acc[genre.id] = genre.name;
      return acc;
    }, {});
  })();

  return cachedMovieGenreMapPromise;
}
