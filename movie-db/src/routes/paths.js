export const paths = {
  home: "/",
  movies: "/movies",
  movieDetails: (id = ":id") => `/movies/${id}`,
  people: "/people",
  personDetails: (id = ":id") => `/people/${id}`,
};
