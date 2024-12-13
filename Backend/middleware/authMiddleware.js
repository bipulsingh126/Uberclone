import UserModel from "../models/user.model.js";
import jwt, { decode } from "jsonwebtoken";
import BlacklistModel from "../models/blacklist.model.js";
import CaptainModel from "../models/captain.model.js";

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const blacklistedToken = await BlacklistModel.findOne({ token });
    if (blacklistedToken) {
      return res.status(401).json({
        success: false,
        message: "You have been logged out",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded._id);

    req.user = user;
    return next();
  } catch (error) {
    console.log(error);
  }
};



export const authCaptain = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const blacklistedToken = await BlacklistModel.findOne({ token });
    if (blacklistedToken) {
      return res.status(401).json({
        success: false,
        message: "You have been logged out",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await CaptainModel.findById(decoded._id);
    req.captain = captain;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
