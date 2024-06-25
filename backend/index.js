import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./route/auth.route.js";
import messageRoute from "./route/message.route.js";
import userRoutes from "./route/user.route.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
// import protectRoute from "./middleware/protectRoute.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is listning at ${PORT}`);
});
