export const API_URL = "https://taskmanagement-rho.vercel.app";

export const LOCALHOST_BACKEND_URL = "http://localhost:3005/api/v1";

const API_ENDPOINT = {
  login: `${API_URL}/api/v1/login`,
  signup: `${API_URL}/api/v1/signup`,
  logout: `${API_URL}/api/v1/logout`,
  allTask: `${API_URL}/api/v1/todo/alltodo`,
  newTask: `${API_URL}/api/v1/todo/new`,
  updateTask: `${API_URL}/api/v1/todo/update`,
  deleteTask: `${API_URL}/api/v1/todo/delete`,
  searchTask: `${API_URL}/api/v1/todo/search`,
  pendingTask: `${API_URL}/api/v1/todo/category?category=Pending`,
  completedTask: `${API_URL}/api/v1/todo/category?category=Completed`,
  taskDetail: `${API_URL}/api/v1/todo/taskdetail`,
  allUsers: `${API_URL}/api/v1/allusers`,
};

export default API_ENDPOINT;
