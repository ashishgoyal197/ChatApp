import express from "express";
const route = express.Router();
import { sendMessage, getMessage } from "../controller/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

route.get("/:id", protectRoute, getMessage);
route.post("/send/:id", protectRoute, sendMessage);

export default route;
