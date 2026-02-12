import { call, put, takeLatest } from "redux-saga/effects";
import { fetchMovieDetails } from "../../../services/tmdb/movies";
import {
  fetchMovieDetailsFailed,
  fetchMovieDetailsRequested,
  fetchMovieDetailsSucceeded,
} from "./movieDetailsSlice";

function* fetchMovieDetailsWorker(action) {
  try {
    const data = yield call(fetchMovieDetails, { id: action.payload });
    yield put(fetchMovieDetailsSucceeded(data));
  } catch (error) {
    yield put(fetchMovieDetailsFailed(error?.message || String(error)));
  }
}

export function* movieDetailsSaga() {
  yield takeLatest(fetchMovieDetailsRequested.type, fetchMovieDetailsWorker);
}
