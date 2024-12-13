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
