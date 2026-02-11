import { all } from "redux-saga/effects";
// import { moviesSaga } from "../../features/movies/state/moviesSaga";
// import { peopleSaga } from "../../features/people/state/peopleSaga";

export function* rootSaga() {
  yield all([
    // moviesSaga(),
    // peopleSaga(),
  ]);
}