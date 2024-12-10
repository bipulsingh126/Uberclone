import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import BlacklistModel from "../models/blacklist.model.js";

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
