import { all } from "redux-saga/effects";
import { moviesSaga } from "../../features/movies/state/moviesSaga";
import { peopleSaga } from "../../features/people/state/PeopleSaga";
import { movieDetailsSaga } from "../../features/movies/state/movieDetailsSaga";
import { personDetailsSaga } from "../../features/people/state/personDetailsSaga";

export function* rootSaga() {
  yield all([
    moviesSaga(),
    peopleSaga(),
    movieDetailsSaga(),
    personDetailsSaga(),
  ]);
}
