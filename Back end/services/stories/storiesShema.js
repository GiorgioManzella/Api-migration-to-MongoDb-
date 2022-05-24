import mongoose from "mongoose";

const { Schema, model } = mongoose;

const storySchema = new Schema({
  userName: { type: String },
  password: { type: String },
});

export default model("story", storySchema);
