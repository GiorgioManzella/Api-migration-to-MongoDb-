import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  refresh_Token: { type: String },
});

export default model("user", userSchema);
