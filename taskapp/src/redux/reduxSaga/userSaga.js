import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  allUsersFailure,
  allUsersRequest,
  allUsersSuccess,
  logoutUserFailure,
  logoutUserRequest,
  logoutUserSuccess,
  userLoginFailure,
  userLoginRequest,
  userLoginSuccess,
  userSignupFailure,
  userSignupRequest,
  userSignupSuccess,
} from "../reduxSlice/userSlice.js";
import API_ENDPOINT from "../../utils/apiEndPoints";

function* login(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_ENDPOINT.login}`,
      {
        email: action.payload.email,
        password: action.payload.password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    yield put(userLoginSuccess(response.data));
    const token = response.data.token;
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", response.data.user.name);
      window.location.href = `${window.location.origin}/home`;
    }
  } catch (error) {
    yield put(userLoginFailure(error.message));
  }
}

function* signup(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_ENDPOINT.signup}`,
      {
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    yield put(userSignupSuccess(response.data));
    const token = response.data.token;
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", response.data.user.name);
      window.location.href = `${window.location.origin}/home`;
    }
  } catch (error) {
    yield put(userSignupFailure(error.message));
  }
}
//  all users for admin page

function* allUsersSaga() {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(axios.get, `${API_ENDPOINT.allUsers}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(allUsersSuccess(response.data));
  } catch (error) {
    yield put(allUsersFailure(error.message));
  }
}

// logout user
function* logoutUserSaga() {
  try {
    const response = yield call(axios.get, `${API_ENDPOINT.logout}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    yield put(logoutUserSuccess(response.data));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (error) {
    yield put(logoutUserFailure(error.message));
  }
}

export default function* userSaga() {
  yield takeEvery(userLoginRequest.type, login);
  yield takeEvery(userSignupRequest.type, signup);
  yield takeEvery(allUsersRequest.type, allUsersSaga);
  yield takeEvery(logoutUserRequest.type, logoutUserSaga);
}
