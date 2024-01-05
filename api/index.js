import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Connect to Mongoose
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(err))

const app = express();


// Listening a server
app.listen(3000, () => {
  console.log("Server listening on port 3000...");
});