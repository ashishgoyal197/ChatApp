import express from "express";
const route = express.Router();
import rateLimit from "express-rate-limit";
import {
  sendMessage,
  getMessage,
  editMessage,
  deleteMessage,
  reactToMessage,
  pinMessage,
  searchMessages,
} from "../controller/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const messageLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});

route.use(messageLimiter);

route.get("/search/:id", protectRoute, searchMessages);
route.get("/:id", protectRoute, getMessage);
route.post("/send/:id", protectRoute, sendMessage);
route.patch("/edit/:id", protectRoute, editMessage);
route.delete("/:id", protectRoute, deleteMessage);
route.post("/react/:id", protectRoute, reactToMessage);
route.patch("/pin/:id", protectRoute, pinMessage);

export default route;
