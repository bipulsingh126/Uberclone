import express from "express";
import { body } from "express-validator";
import { registerUser } from "../controllers/userControllrs.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Enter a valid email")
      .normalizeEmail(),
    body("fullname.firstname")
      .trim()
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("fullname.lastname")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);

export { userRouter };
