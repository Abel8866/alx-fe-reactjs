import { combineReducers } from "@reduxjs/toolkit";
import moviesReducer from "../../features/movies/state/moviesSlice";
import peopleReducer from "../../features/people/state/peopleSlice";
import movieDetailsReducer from "../../features/movies/state/movieDetailsSlice";
import personDetailsReducer from "../../features/people/state/personDetailsSlice";

export const rootReducer = combineReducers({
  movies: moviesReducer,
  people: peopleReducer,
  movieDetails: movieDetailsReducer,
  personDetails: personDetailsReducer,
});
