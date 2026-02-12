import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

const personDetailsSlice = createSlice({
  name: "personDetails",
  initialState,
  reducers: {
    fetchPersonDetailsRequested(state) {
      state.status = "loading";
      state.error = null;
      state.data = null;
    },
    fetchPersonDetailsSucceeded(state, action) {
      state.status = "succeeded";
      state.data = action.payload;
    },
    fetchPersonDetailsFailed(state, action) {
      state.status = "failed";
      state.error = action.payload || "Request failed";
    },
    clearPersonDetails(state) {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  fetchPersonDetailsRequested,
  fetchPersonDetailsSucceeded,
  fetchPersonDetailsFailed,
  clearPersonDetails,
} = personDetailsSlice.actions;

export const selectPersonDetailsState = (state) => state.personDetails;
export const selectPersonDetails = (state) =>
  selectPersonDetailsState(state).data;
export const selectPersonDetailsStatus = (state) =>
  selectPersonDetailsState(state).status;
export const selectPersonDetailsError = (state) =>
  selectPersonDetailsState(state).error;

export default personDetailsSlice.reducer;
