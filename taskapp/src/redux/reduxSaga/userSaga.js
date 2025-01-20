import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  allUsersFailure,
  allUsersRequest,
  allUsersSuccess,
  createUserFeedFailure,
  createUserFeedRequest,
  createUserFeedSuccess,
  logoutUserFailure,
  logoutUserRequest,
  logoutUserSuccess,
  myScoreRankFailure,
  myScoreRankRequest,
  myScoreRankSuccess,
  userAnalyticsFailure,
  userAnalyticsRequest,
  userAnalyticsSuccess,
  userLoginFailure,
  userLoginRequest,
  userLoginSuccess,
  userSignupFailure,
  userSignupRequest,
  userSignupSuccess,
  getAllUserFeedFailure,
  getAllUserFeedSuccess,
  getAllUserFeedRequest,
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

//  user Analytics Saga

function* userAnalyticsSaga() {
  try {
    const response = yield call(
      axios.get,
      `${API_ENDPOINT.userAnalytics}?userAnalytics=bargraph`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    yield put(userAnalyticsSuccess(response.data));
  } catch (error) {
    yield put(userAnalyticsFailure(error.message));
  }
}

//  my completed task Rank Saga

function* myCompletedTaskRankSaga() {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(
      axios.get,
      `${API_ENDPOINT.myCompletedTaskRank}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put(myScoreRankSuccess(response.data));
  } catch (error) {
    yield put(myScoreRankFailure(error.message));
  }
}

// create user feed
function* createUserFeedSaga(action) {
  console.log("------------user feed saga action", action);
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("description", action.payload.description);
    formData.append("image", action.payload.profileImage);
    const response = yield call(
      axios.post,
      `${API_ENDPOINT.createUserFeed}`,
      formData,
      {
        withCredentials: true,
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put(createUserFeedSuccess(response.data));
    yield put(getAllUserFeedRequest());
  } catch (error) {
    yield put(createUserFeedFailure(error.message));
  }
}

// get All user created feeds

function* getAllUserFeedskSaga() {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(axios.get, `${API_ENDPOINT.getAllUserFeeds}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(getAllUserFeedSuccess(response.data));
  } catch (error) {
    yield put(getAllUserFeedFailure(error.message));
  }
}

export default function* userSaga() {
  yield takeEvery(userLoginRequest.type, login);
  yield takeEvery(userSignupRequest.type, signup);
  yield takeEvery(allUsersRequest.type, allUsersSaga);
  yield takeEvery(logoutUserRequest.type, logoutUserSaga);
  yield takeEvery(userAnalyticsRequest.type, userAnalyticsSaga);
  yield takeEvery(myScoreRankRequest.type, myCompletedTaskRankSaga);
  yield takeEvery(createUserFeedRequest.type, createUserFeedSaga);
  yield takeEvery(getAllUserFeedRequest.type, getAllUserFeedskSaga);
}
