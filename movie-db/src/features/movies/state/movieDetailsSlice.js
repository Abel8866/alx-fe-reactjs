import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {
    fetchMovieDetailsRequested(state) {
      state.status = "loading";
      state.error = null;
      state.data = null;
    },
    fetchMovieDetailsSucceeded(state, action) {
      state.status = "succeeded";
      state.data = action.payload;
    },
    fetchMovieDetailsFailed(state, action) {
      state.status = "failed";
      state.error = action.payload || "Request failed";
    },
    clearMovieDetails(state) {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  fetchMovieDetailsRequested,
  fetchMovieDetailsSucceeded,
  fetchMovieDetailsFailed,
  clearMovieDetails,
} = movieDetailsSlice.actions;

export const selectMovieDetailsState = (state) => state.movieDetails;
export const selectMovieDetails = (state) =>
  selectMovieDetailsState(state).data;
export const selectMovieDetailsStatus = (state) =>
  selectMovieDetailsState(state).status;
export const selectMovieDetailsError = (state) =>
  selectMovieDetailsState(state).error;

export default movieDetailsSlice.reducer;
