import express from "express";
const route = express.Router();
import { sendMessage } from "../controller/message.controller.js";

route.post("/send/:id", sendMessage);

export default route;
