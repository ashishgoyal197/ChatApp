import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./route/auth.route.js";
import messageRoute from "./route/message.route.js";
import userRoutes from "./route/user.route.js";
import { app, server } from "./socket/socket.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

const __dirname = path.resolve();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);
app.use("/api/users", userRoutes);

// route application

app.use(express.static(path.join(__dirname, "/frontend/ChatApp/dist")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "frontend", "ChatApp", "dist", "index.html")
  );
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is listning at ${PORT}`);
});
