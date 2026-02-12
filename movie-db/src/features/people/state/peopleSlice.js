import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  page: 1,
  query: "",
  totalPages: 1,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    fetchPeopleRequested(state) {
      state.status = "loading";
      state.error = null;
    },
    fetchPeopleSucceeded(state, action) {
      state.status = "succeeded";
      state.items = action.payload?.results ?? [];
      state.totalPages = action.payload?.total_pages ?? 1;
    },
    fetchPeopleFailed(state, action) {
      state.status = "failed";
      state.error = action.payload || "Request failed";
    },
    setPeopleQuery(state, action) {
      state.query = action.payload;
      state.page = 1;
    },
    setPeoplePage(state, action) {
      state.page = action.payload;
    },
  },
});

export const {
  fetchPeopleRequested,
  fetchPeopleSucceeded,
  fetchPeopleFailed,
  setPeopleQuery,
  setPeoplePage,
} = peopleSlice.actions;

export const selectPeopleState = (state) => state.people;
export const selectPeople = (state) => selectPeopleState(state).items;
export const selectPeopleStatus = (state) => selectPeopleState(state).status;
export const selectPeopleError = (state) => selectPeopleState(state).error;
export const selectPeopleQuery = (state) => selectPeopleState(state).query;
export const selectPeoplePage = (state) => selectPeopleState(state).page;
export const selectPeopleTotalPages = (state) =>
  selectPeopleState(state).totalPages;

export default peopleSlice.reducer;
