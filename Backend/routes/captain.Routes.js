import express from "express";
import { body } from "express-validator";
import { getCaptainProfile, loginCaptain, logoutCaptain, registerCaptain } from "../controllers/captain.controller.js";
import { authCaptain } from "../middleware/authMiddleware.js";

const captainRouter = express.Router();

captainRouter.post("/register", [
  body("email").isEmail().withMessage("Enter a valid email").normalizeEmail(),
  body("fullname.firstname")
    .trim()
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("vehicle.color")
    .isLength({ min: 3 })
    .withMessage("Color must be at least 3 characters long"),
  body("vehicle.plate")
    .isLength({ min: 3 })
    .withMessage("Plate must be at least 3 characters long"),
  body("vehicle.capacity").isInt().withMessage("Capacity must be at least 1"),
  body("vehicle.vehicleType")
    .isIn(["car", "motorcycle", "truck"])
    .withMessage("Vehicle type must be car, motorcycle or auto"),
], registerCaptain);

captainRouter.post("/login", [
  body("email").isEmail().withMessage("Enter a valid email").normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
], loginCaptain);

captainRouter.get("/profile", authCaptain, getCaptainProfile);

captainRouter.get("/logout", authCaptain, logoutCaptain)

export default captainRouter;
