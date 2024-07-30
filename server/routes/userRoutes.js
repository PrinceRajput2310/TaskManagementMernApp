import express from "express";
import {
  loginPerson,
  registerPerson,
  getAllPersons,
  getSingleUserDetail,
  logoutUser
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/signup", registerPerson);
router.post("/login", loginPerson);
router.get("/allusers", getAllPersons);
router.route("/user").get(getSingleUserDetail);
router.route("/logout").get(logoutUser)

export default router;
