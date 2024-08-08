let apiSever = "http://localhost:3005";

const frontendDomain = window.location.origin;

if (frontendDomain.includes("localhost")) {
  apiSever = "http://localhost:3005";
} else if (frontendDomain.includes("taskmanagement")) {
  apiSever = "https://taskmanagement-rho.vercel.app";
}
//   export const API_URL = "https://taskmanagement-rho.vercel.app";

// export const LOCALHOST_BACKEND_URL = "http://localhost:3005";

const API_ENDPOINT = {
  login: `${apiSever}/api/v1/login`,
  signup: `${apiSever}/api/v1/signup`,
  logout: `${apiSever}/api/v1/logout`,
  allTask: `${apiSever}/api/v1/todo/alltodo`,
  newTask: `${apiSever}/api/v1/todo/new`,
  updateTask: `${apiSever}/api/v1/todo/update`,
  deleteTask: `${apiSever}/api/v1/todo/delete`,
  searchTask: `${apiSever}/api/v1/todo/search`,
  pendingTask: `${apiSever}/api/v1/todo/category?category=Pending`,
  completedTask: `${apiSever}/api/v1/todo/category?category=Completed`,
  taskDetail: `${apiSever}/api/v1/todo/taskdetail`,
  allUsers: `${apiSever}/api/v1/allusers`,
  userAnalytics: `${apiSever}/api/v1/user/analytics`,
  taskAnalytics: `${apiSever}/api/v1/todo/taskanalytics`,
};

export default API_ENDPOINT;
