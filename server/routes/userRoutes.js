import express from "express";
import {
  loginPerson,
  registerPerson,
  getAllPersons,
  getSingleUserDetail,
  logoutUser,
  userAnalytics,
  getYourScoreData,
} from "../controllers/userControllers.js";
import { isAuthenticatedUser } from "../middleware/userAuth.js";

const router = express.Router();

router.post("/signup", registerPerson);
router.post("/login", loginPerson);
router.get("/allusers", getAllPersons);
router.route("/user").get(getSingleUserDetail);
router.route("/logout").get(logoutUser);
router.route("/user/analytics").get(userAnalytics);
router.route("/user/myscore").get(isAuthenticatedUser, getYourScoreData);

export default router;
