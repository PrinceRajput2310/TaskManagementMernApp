import express from "express";

import {
  addTodo,
  getAllTodos,
  deleteTodo,
  searchTodo,
  updateTodo,
  getTaskByCategory,
  getTotalTask,
  taskAnalytics,
} from "../controllers/todoControllers.js";
import { sendEmail } from "../controllers/SendEmail.js";
import { isAuthenticatedUser } from "../middleware/userAuth.js";
const router = express.Router();

router.route("/todo/new").post(isAuthenticatedUser, addTodo);
router.route("/todo/alltodo").get(isAuthenticatedUser, getAllTodos);
router.route("/todo/category").get(isAuthenticatedUser, getTaskByCategory);
router.route("/todo/taskdetail").get(isAuthenticatedUser, getTotalTask);
router.delete("/todo/delete", isAuthenticatedUser, deleteTodo);
router.post("/todo/search", isAuthenticatedUser, searchTodo);
router.route("/todo/update").put(isAuthenticatedUser, updateTodo);
router.route("/todo/taskanalytics").get(taskAnalytics);
router.route("/sendemail").post(sendEmail);

export default router;
