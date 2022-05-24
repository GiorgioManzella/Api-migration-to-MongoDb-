import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema, model } = mongoose;

const blogSchema = new Schema(
  {
    category: { type: String },
    title: { type: String },
    cover: { type: String },
    readTime: {
      value: { type: Number },
      avatar: { type: String },
    },
    content: { type: String },
    comments: [{ title: { type: String }, comment: { type: String } }],
    userName: { type: String },
    email: { type: String },
    password: { type: String },
  },
  { timestamps: true }
);

blogSchema.pre("save", async function (next) {
  const Blog = this;
  const password = this.password;

  if (Blog.isModified()) {
    const hash = await bcrypt.hash(password, 10);
    Blog.password = hash;
    next();
  } else {
  }
});

export default model("Blog", blogSchema); // linked to user collection / if not present will be created
