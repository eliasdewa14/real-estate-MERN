import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

const app = express();

// Connect to Mongoose
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(err))

// to allow json input to the server
app.use(express.json());

// routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
});

// Listening a server
app.listen(3000, () => {
  console.log("Server listening on port 3000...");
});