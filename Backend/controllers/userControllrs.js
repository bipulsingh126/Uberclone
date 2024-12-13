import UserModel from "../models/user.model.js";
import { createUser } from "../services/userService.js";
import { validationResult } from "express-validator";
import BlacklistModel from "../models/blacklist.model.js";

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

    const isUserAlreadyExists = await UserModel.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
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

export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = await user.generateAuthToken();

    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      success: true,
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login user",
    });
  }
};

export const profile = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get user profile",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await BlacklistModel.create({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout user",
    });
  }
};
