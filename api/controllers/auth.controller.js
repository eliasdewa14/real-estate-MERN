import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

// Sign up a new user
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

// Sign in a user
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // To check if the user's email is exist or not
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found'));
    // Check if the user's password is correct
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Invalid password'));

    // Create a token for authentication
    const token = jwt.sign({
      id: validUser._id },
      process.env.JWT_SECRET
    );
    // to prevent showing up the hashed password
    const { password: pass, ...rest } = validUser._doc;
    res.cookie('access_token', token, { httpOnly: true}).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
// Sign in with google account
export const google = async (req, res, next) => {

  try {
    // To check if the user's email is exist or not
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // Register the user
      // Create a token for authentication
      const token = jwt.sign({
        id: user._id },
        process.env.JWT_SECRET
      );
      // to prevent showing up the hashed password
      const { password: pass, ...rest } = user._doc;
      res.cookie('access_token', token, { httpOnly: true}).status(200).json(rest);
    } else {
      // Create a new user
      // Create a new password
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: req.body.name.split(' ').join('').toLowerCase(),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo
      });
      await newUser.save();
      // Create a token for authentication
      const token = jwt.sign({
        id: newUser._id },
        process.env.JWT_SECRET
      );
      // to prevent showing up the hashed password
      const { password: pass, ...rest } = newUser._doc;
      res.cookie('access_token', token, { httpOnly: true}).status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};

// Sign out the user
export const signout = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been signed out!')
  } catch (error) {
    next(error);
  }
};