import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentSchema = new Schema({
  title: { type: String, required: true },
  comment: { type: String, required: true },
});

export default model("comment", commentSchema);
