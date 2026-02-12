import { getJson } from "../http/client";
import { tmdbEndpoint } from "../http/endpoints";

export async function fetchPopularPeople({ page = 1 } = {}) {
  const { url, params } = tmdbEndpoint("/person/popular", { page });
  return getJson(url, { params });
}

export async function searchPeople({ query, page = 1 } = {}) {
  const { url, params } = tmdbEndpoint("/search/person", {
    query,
    page,
    include_adult: false,
  });
  return getJson(url, { params });
}

export async function fetchPeople({ query, page = 1 } = {}) {
  if (query) {
    return searchPeople({ query, page });
  }
  return fetchPopularPeople({ page });
}

export async function fetchPersonDetails({ id } = {}) {
  const { url, params } = tmdbEndpoint(`/person/${id}`, {});
  return getJson(url, { params });
}
