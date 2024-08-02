import express from "express";

import {
  addTodo,
  getAllTodos,
  deleteTodo,
  searchTodo,
  updateTodo,
  getTaskByCategory,
  getTotalTask,
} from "../controllers/todoControllers.js";
import { sendEmail } from "../controllers/SendEmail.js";
import { isAuthenticatedUser } from "../middleware/userAuth.js";
const router = express.Router();

router.route("/todo/new").post(isAuthenticatedUser, addTodo);
router.route("/todo/alltodo").get(isAuthenticatedUser, getAllTodos);
router.route("/todo/category").get(isAuthenticatedUser, getTaskByCategory);
router.route("/todo/taskdetail").get(isAuthenticatedUser, getTotalTask);
router.delete("/todo/delete", deleteTodo);
router.post("/todo/search", isAuthenticatedUser, searchTodo);
router.route("/todo/update").put(updateTodo);
router.route("/sendemail").post(sendEmail);

export default router;
