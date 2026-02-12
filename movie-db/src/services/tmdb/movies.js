import { getJson } from "../http/client";
import { tmdbEndpoint } from "../http/endpoints";

export async function fetchPopularMovies({ page = 1 } = {}) {
  const { url, params } = tmdbEndpoint("/movie/popular", { page });
  return getJson(url, { params });
}

export async function searchMovies({ query, page = 1 } = {}) {
  const { url, params } = tmdbEndpoint("/search/movie", {
    query,
    page,
    include_adult: false,
  });
  return getJson(url, { params });
}

export async function fetchMovies({ query, page = 1 } = {}) {
  if (query) {
    return searchMovies({ query, page });
  }
  return fetchPopularMovies({ page });
}

export async function fetchMovieDetails({ id } = {}) {
  // include cast/crew in the same request
  const { url, params } = tmdbEndpoint(`/movie/${id}`, {
    append_to_response: "credits",
  });
  return getJson(url, { params });
}
