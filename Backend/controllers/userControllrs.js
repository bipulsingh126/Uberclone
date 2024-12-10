import UserModel from "../models/user.model.js";
import { createUser } from "../services/userService.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { fullname, email, password } = req.body;

    // Validate fullname structure
    if (!fullname?.firstname || !fullname?.lastname) {
      return res.status(400).json({
        success: false,
        message: "First name and last name are required",
      });
    }

    const hashedPassword = await UserModel.hashPassword(password);
    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    const token = await user.generateAuthToken();

    return res.status(201).json({
      success: true,
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to register user",
    });
  }
};
