import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { userRouter } from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import captainRouter from "./routes/captain.Routes.js";

const app = express();

dotenv.config();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/users", userRouter);
app.use("/captains", captainRouter);

export default app;
