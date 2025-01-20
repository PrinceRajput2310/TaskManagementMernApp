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
import { createUserFeed, getAllUsersFeeds, upload } from "../controllers/userFeedController.js";

const router = express.Router();

router.post("/signup", registerPerson);
router.post("/login", loginPerson);
router.get("/allusers", getAllPersons);
router.route("/user").get(getSingleUserDetail);
router.route("/logout").get(logoutUser);
router.route("/user/analytics").get(userAnalytics);
router.route("/user/myscore").get(isAuthenticatedUser, getYourScoreData);
router.post(
  "/user/feed",
  isAuthenticatedUser,
  upload.single("image"),
  createUserFeed
);

router.get("/user/allfeeds",isAuthenticatedUser,getAllUsersFeeds)

export default router;
