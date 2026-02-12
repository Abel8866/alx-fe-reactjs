import { TMDB_API_BASE_URL, getTmdbApiKey } from "../tmdb/config";

export function tmdbEndpoint(path, params) {
  return {
    url: `${TMDB_API_BASE_URL}${path}`,
    params: {
      api_key: getTmdbApiKey(),
      language: "en-US",
      ...params,
    },
  };
}
