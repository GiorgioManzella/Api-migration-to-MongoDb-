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

//auth

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
// not returning password

blogSchema.methods.toJSON = function () {
  const data = this;
  const dataObject = data.toObject(); //always convert to object to delete.

  delete dataObject.password;
  delete dataObject._id;

  return dataObject;
};

blogSchema.statics.checkCredentials = async function (userName, password) {
  const blog = await this.findOne({ userName });

  if (blog) {
    const isMatch = await bcrypt.compare(password, blog.password);

    if (isMatch) return blog;
  } else {
    return null;
  }
};

export default model("Blog", blogSchema); // linked to user collection / if not present will be created
