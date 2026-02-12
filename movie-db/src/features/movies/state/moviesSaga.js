import { call, put, select, takeLatest } from "redux-saga/effects";
import { fetchMovies } from "../../../services/tmdb/movies";
import {
  fetchMoviesFailed,
  fetchMoviesRequested,
  fetchMoviesSucceeded,
  selectMoviesPage,
  selectMoviesQuery,
} from "./moviesSlice";

function* fetchMoviesWorker() {
  try {
    const query = yield select(selectMoviesQuery);
    const page = yield select(selectMoviesPage);
    const data = yield call(fetchMovies, { query, page });
    yield put(fetchMoviesSucceeded(data));
  } catch (error) {
    yield put(fetchMoviesFailed(error?.message || String(error)));
  }
}

export function* moviesSaga() {
  yield takeLatest(fetchMoviesRequested.type, fetchMoviesWorker);
}
