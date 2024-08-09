import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    user: [],
    lodaing: false,
    error: null,
  },
  reducers: {
    // user login reducer
    userLoginRequest(state) {
      state.lodaing = true;
    },
    userLoginSuccess(state, action) {
      state.lodaing = false;
      state.data = action.payload;
    },
    userLoginFailure(state, action) {
      state.lodaing = false;
      state.error = action.payload;
    },
    // user Signup reducer
    userSignupRequest(state) {
      state.lodaing = true;
    },
    userSignupSuccess(state, action) {
      state.lodaing = false;
      state.data = action.payload;
    },
    userSignupFailure(state, action) {
      state.lodaing = false;
      state.error = action.payload;
    },
    // all users reducer
    allUsersRequest(state) {
      state.lodaing = true;
    },
    allUsersSuccess(state, action) {
      state.lodaing = false;
      state.data = action.payload;
    },
    allUsersFailure(state, action) {
      state.lodaing = false;
      state.error = action.payload;
    },
    // user logout reducer
    logoutUserRequest(state) {
      state.lodaing = true;
    },
    logoutUserSuccess(state, action) {
      state.lodaing = false;
      state.data = action.payload;
    },
    logoutUserFailure(state, action) {
      state.lodaing = false;
      state.error = action.payload;
    },
    // user Analytics reducer
    userAnalyticsRequest(state) {
      state.lodaing = true;
    },
    userAnalyticsSuccess(state, action) {
      state.lodaing = false;
      state.data = action.payload;
    },
    userAnalyticsFailure(state, action) {
      state.lodaing = false;
      state.error = action.payload;
    },
  },
});

export const {
  userLoginFailure,
  userLoginRequest,
  userLoginSuccess,
  userSignupFailure,
  userSignupRequest,
  userSignupSuccess,
  allUsersFailure,
  allUsersRequest,
  allUsersSuccess,
  logoutUserFailure,
  logoutUserRequest,
  logoutUserSuccess,
  userAnalyticsFailure,
  userAnalyticsRequest,
  userAnalyticsSuccess,
} = UserSlice.actions;

export default UserSlice.reducer;
