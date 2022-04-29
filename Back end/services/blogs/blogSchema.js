import mongoose from "mongoose";

const { Schema, model } = mongoose;

const blogSchema = new Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String, required: true },
    readTime: {
      value: { type: Number, required: true },
      avatar: { type: String, required: true },
    },
    content: { type: String, required: true },
    comments: [{ title: { type: String }, comment: { type: String } }],
  },
  { timestamps: true }
);

export default model("Blog", blogSchema); // linked to user collection / if not present will be created
