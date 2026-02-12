import { call, put, select, takeLatest } from "redux-saga/effects";
import { fetchPeople } from "../../../services/tmdb/people";
import {
  fetchPeopleFailed,
  fetchPeopleRequested,
  fetchPeopleSucceeded,
  selectPeoplePage,
  selectPeopleQuery,
} from "./peopleSlice";

function* fetchPeopleWorker() {
  try {
    const query = yield select(selectPeopleQuery);
    const page = yield select(selectPeoplePage);
    const data = yield call(fetchPeople, { query, page });
    yield put(fetchPeopleSucceeded(data));
  } catch (error) {
    yield put(fetchPeopleFailed(error?.message || String(error)));
  }
}

export function* peopleSaga() {
  yield takeLatest(fetchPeopleRequested.type, fetchPeopleWorker);
}
