import { all } from "redux-saga/effects";
import userSaga from "./userSaga";
import taskSaga from "./taskSaga";

export default function* rootSaga() {
  yield all([taskSaga(), userSaga()]);
}
