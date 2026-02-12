import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  page: 1,
  query: "",
  totalPages: 1,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    fetchMoviesRequested(state) {
      state.status = "loading";
      state.error = null;
    },
    fetchMoviesSucceeded(state, action) {
      state.status = "succeeded";
      state.items = action.payload?.results ?? [];
      state.totalPages = action.payload?.total_pages ?? 1;
    },
    fetchMoviesFailed(state, action) {
      state.status = "failed";
      state.error = action.payload || "Request failed";
    },
    setMoviesQuery(state, action) {
      state.query = action.payload;
      state.page = 1;
    },
    setMoviesPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const {
  fetchMoviesRequested,
  fetchMoviesSucceeded,
  fetchMoviesFailed,
  setMoviesQuery,
  setMoviesPage,
} = moviesSlice.actions;

export const selectMoviesState = (state) => state.movies;
export const selectMovies = (state) => selectMoviesState(state).items;
export const selectMoviesStatus = (state) => selectMoviesState(state).status;
export const selectMoviesError = (state) => selectMoviesState(state).error;
export const selectMoviesQuery = (state) => selectMoviesState(state).query;
export const selectMoviesPage = (state) => selectMoviesState(state).page;
export const selectMoviesTotalPages = (state) =>
  selectMoviesState(state).totalPages;

export default moviesSlice.reducer;
