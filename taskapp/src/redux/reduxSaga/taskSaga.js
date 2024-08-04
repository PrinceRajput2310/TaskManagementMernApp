import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchTaskFailure,
  fetchTaskRequest,
  fetchTaskSuccess,
  newTaskFailure,
  newTaskRequest,
  newTaskSuccess,
  updateTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
  deleteTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  searchTaskFailure,
  searchTaskRequest,
  searchTaskSuccess,
  pendingTaskFailure,
  pendingTaskRequest,
  completedTaskSuccess,
  completedTaskFailure,
  pendingTaskSuccess,
  completedTaskRequest,
  allTaskSuccess,
  allTaskFailure,
  allTaskRequest,
} from "../reduxSlice/taskSlice";
import API_ENDPOINT from "../../utils/apiEndPoints";

// get All task
function* fetchTaskDetailSaga() {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(axios.get, `${API_ENDPOINT.allTask}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(fetchTaskSuccess(response.data));
  } catch (error) {
    yield put(fetchTaskFailure(error.message));
  }
}
// create New Task
function* newTaskSaga(action) {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(
      axios.post,
      `${API_ENDPOINT.newTask}`,
      {
        title: action.payload.title,
        content: action.payload.todo,
        status: action.payload.taskStatus,
        priority: action.payload.taskPriority,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put(newTaskSuccess(response.data));
    // fetch all task
    yield put(fetchTaskRequest());
    yield put(allTaskRequest());
  } catch (error) {
    yield put(newTaskFailure(error.message));
  }
}

// update task saga

function* updateTaskSaga(action) {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(
      axios.put,
      `${API_ENDPOINT.updateTask}`,
      {
        id: action.payload.editId,
        title: action.payload.newTitle,
        content: action.payload.newTodo,
        status: action.payload.newStaus,
        priority: action.payload.newPriority,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put(updateTaskSuccess(response.data));
    // fetch updated data
    yield put(allTaskRequest());
    yield put(fetchTaskRequest());
  } catch (error) {
    yield put(updateTaskFailure(error.message));
  }
}

//  delete task
function* deleteTaskSaga(action) {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(
      axios.delete,
      `${API_ENDPOINT.deleteTask}`,

      {
        data: {
          id: action.payload.id,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put(deleteTaskSuccess(response.data));
    // fetch updated data
    yield put(allTaskRequest());
    yield put(fetchTaskRequest());
  } catch (error) {
    yield put(deleteTaskFailure(error.message));
  }
}

// Search Task

function* searchTaskSaga(action) {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(
      axios.post,
      `${API_ENDPOINT.searchTask}`,
      {
        title: action.payload.value,
      },

      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put(searchTaskSuccess(response.data));
  } catch (error) {
    yield put(searchTaskFailure(error.message));
  }
}

//pending Task

function* pendingTaskSaga() {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(
      axios.get,
      `${API_ENDPOINT.pendingTask}`,

      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put(pendingTaskSuccess(response.data));
  } catch (error) {
    yield put(pendingTaskFailure(error.message));
  }
}
// completed Task
function* completedTaskSaga() {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(
      axios.get,
      `${API_ENDPOINT.completedTask}`,

      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put(completedTaskSuccess(response.data));
  } catch (error) {
    yield put(completedTaskFailure(error.message));
  }
}

// task detail

function* detailTaskSaga() {
  try {
    const token = localStorage.getItem("token");
    const response = yield call(
      axios.get,
      `${API_ENDPOINT.taskDetail}`,

      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put(allTaskSuccess(response.data));
  } catch (error) {
    yield put(allTaskFailure(error.message));
  }
}
export default function* taskSaga() {
  yield takeEvery(fetchTaskRequest.type, fetchTaskDetailSaga);
  yield takeEvery(newTaskRequest.type, newTaskSaga);
  yield takeEvery(updateTaskRequest.type, updateTaskSaga);
  yield takeEvery(deleteTaskRequest.type, deleteTaskSaga);
  yield takeEvery(searchTaskRequest.type, searchTaskSaga);
  yield takeEvery(pendingTaskRequest.type, pendingTaskSaga);
  yield takeEvery(completedTaskRequest.type, completedTaskSaga);
  yield takeEvery(allTaskRequest.type, detailTaskSaga);
}
