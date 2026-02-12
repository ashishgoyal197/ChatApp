import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getUserForSidebar,
  getUserProfile,
  updateUserProfile,
} from "../controller/user.controller.js";

const router = express.Router();

router.get("/profile", protectRoute, getUserProfile);
router.put("/profile", protectRoute, updateUserProfile);
router.get("/", protectRoute, getUserForSidebar);

export default router;
