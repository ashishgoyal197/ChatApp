import express from "express";
import rateLimit from "express-rate-limit";
import protectRoute from "../middleware/protectRoute.js";
import {
  getUserForSidebar,
  getUserProfile,
  updateUserProfile,
} from "../controller/user.controller.js";

const router = express.Router();

const userLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(userLimiter);

router.get("/profile", protectRoute, getUserProfile);
router.put("/profile", protectRoute, updateUserProfile);
router.get("/", protectRoute, getUserForSidebar);

export default router;
