import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'


export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // to hash the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create a new user
  const newUser = new User({username, email, password: hashedPassword});

  // to catch errors
  try {
    // Save the new user inside the database
    await newUser.save();
    // Successfully created the new user message
    res.status(200).json("a new user  created successfully");
  } catch (error) {
    next(error);
  }
};