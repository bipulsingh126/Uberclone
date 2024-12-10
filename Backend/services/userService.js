import UserModel from "../models/user.model.js";

export const createUser = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }
  
  // Check if user exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const user = await UserModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });
  return user;
};
