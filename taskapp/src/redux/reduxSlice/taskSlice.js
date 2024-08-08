import { createSlice } from "@reduxjs/toolkit";

const TaskSlice = createSlice({
  name: "Task",
  initialState: {
    data: [],
    pending: [],
    completed: [],
    searchTask: [],
    allTask: [],
    taskAnalytics: [],
    lodaing: false,
    error: null,
  },
  reducers: {
    // get All Task reducer
    fetchTaskRequest(state) {
      state.lodaing = true;
    },
    fetchTaskSuccess(state, action) {
      state.lodaing = false;
      state.data = action.payload;
    },
    fetchTaskFailure(state, action) {
      state.lodaing = false;
      state.error = action.payload;
    },
    // create New Task Reducer
    newTaskRequest(state) {
      state.lodaing = true;
    },
    newTaskSuccess(state, action) {
      state.lodaing = false;
      state.data = action.payload;
    },
    newTaskFailure(state, action) {
      state.lodaing = false;
      state.error = action.payload;
    },
    // update Task Reducer
    updateTaskRequest(state) {
      state.lodaing = true;
    },
    updateTaskSuccess(state, action) {
      state.lodaing = false;
      state.data = action.payload;
    },
    updateTaskFailure(state, action) {
      state.lodaing = false;
      state.error = action.payload;
    },
    // Search Task Reducer
    searchTaskRequest(state) {
      state.lodaing = true;
    },
    searchTaskSuccess(state, action) {
      state.lodaing = false;
      state.searchTask = action.payload;
    },
    searchTaskFailure(state, action) {
      state.lodaing = false;
      state.error = action.payload;
    },
    // Get Pending Task reducer
    pendingTaskRequest(state) {
      state.lodaing = true;
    },
    pendingTaskSuccess(state, action) {
      state.lodaing = false;
      state.pending = action.payload;
    },
    pendingTaskFailure(state, action) {
      state.lodaing = false;
      state.error = action.payload;
    },
    // Get Completed Task reducer
    completedTaskRequest(state) {
      state.lodaing = true;
    },
    completedTaskSuccess(state, action) {
      state.lodaing = false;
      state.completed = action.payload;
    },
    completedTaskFailure(state, action) {
      state.lodaing = false;
      state.error = action.payload;
    },
    // delete Task reducer
    deleteTaskRequest(state) {
      state.lodaing = true;
    },
    deleteTaskSuccess(state, action) {
      state.lodaing = false;
      state.data = action.payload;
    },
    deleteTaskFailure(state, action) {
      state.lodaing = false;
      state.error = action.payload;
    },
    // get sectional  Task reducer
    allTaskRequest(state) {
      state.lodaing = true;
    },
    allTaskSuccess(state, action) {
      state.lodaing = false;
      state.allTask = action.payload;
    },
    allTaskFailure(state, action) {
      state.lodaing = false;
      state.error = action.payload;
    },
    // get Task analytics reducer
    taskAnalyticsRequest(state) {
      state.lodaing = true;
    },
    taskAnalyticsSuccess(state, action) {
      state.lodaing = false;
      state.taskAnalytics = action.payload;
    },
    taskAnalyticsFailure(state, action) {
      state.lodaing = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTaskFailure,
  fetchTaskRequest,
  fetchTaskSuccess,
  newTaskFailure,
  newTaskRequest,
  newTaskSuccess,
  updateTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
  searchTaskFailure,
  searchTaskRequest,
  searchTaskSuccess,
  pendingTaskFailure,
  pendingTaskRequest,
  pendingTaskSuccess,
  completedTaskFailure,
  completedTaskRequest,
  completedTaskSuccess,
  deleteTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  allTaskFailure,
  allTaskRequest,
  allTaskSuccess,
  taskAnalyticsFailure,
  taskAnalyticsRequest,
  taskAnalyticsSuccess,
} = TaskSlice.actions;

export default TaskSlice.reducer;
