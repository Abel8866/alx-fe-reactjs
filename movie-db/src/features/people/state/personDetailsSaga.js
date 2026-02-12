import { call, put, takeLatest } from "redux-saga/effects";
import { fetchPersonDetails } from "../../../services/tmdb/people";
import {
  fetchPersonDetailsFailed,
  fetchPersonDetailsRequested,
  fetchPersonDetailsSucceeded,
} from "./personDetailsSlice";

function* fetchPersonDetailsWorker(action) {
  try {
    const data = yield call(fetchPersonDetails, { id: action.payload });
    yield put(fetchPersonDetailsSucceeded(data));
  } catch (error) {
    yield put(fetchPersonDetailsFailed(error?.message || String(error)));
  }
}

export function* personDetailsSaga() {
  yield takeLatest(fetchPersonDetailsRequested.type, fetchPersonDetailsWorker);
}
