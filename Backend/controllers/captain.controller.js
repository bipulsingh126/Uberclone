import BlacklistModel from "../models/blacklist.model.js";
import CaptainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";

export const registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExists = await CaptainModel.findOne({ email });
    if (isCaptainAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Captain already exists with this email",
      });
    }

    const hashedPassword = await CaptainModel.hashPassword(password);

    const captain = await createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });
    const token = await captain.generateAuthToken();
    res.cookie("token", token, { httpOnly: true });

    return res.status(201).json({
      success: true,
      data: {
        captain,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    const captain = await CaptainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isPasswordMatch = await captain.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = await captain.generateAuthToken();
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      success: true,
      data: {
        captain,
      },
    });
  } catch (error) {
    console.log(error);
  }
};


export const getCaptainProfile = async (req, res) => {
  try {
    const captain = req.captain;
    return res.status(200).json({
      success: true,
      data: {
        captain,
      },
    });
  } catch (error) {
    console.log(error);
  }
}


export const logoutCaptain = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await BlacklistModel.create({ token });
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
  }
}
