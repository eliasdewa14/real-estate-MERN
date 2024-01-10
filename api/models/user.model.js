import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: 'string',
    required: true,
    unique: true
  },
  email: {
    type: 'string',
    required: true,
    unique: true
  },
  password: {
    type: 'string',
    required: true
  },
  avatar: {
    type: 'string',
    default: "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg",
  }
},
{ timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;