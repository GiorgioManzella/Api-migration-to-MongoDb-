import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  refresh_Token: { type: String },
});

userSchema.pre("save", async function (next) {
  const currentUser = this;
  const plainPW = this.password;

  if (currentUser.isModified("password")) {
    const hash = await bcrypt.hash(plainPW, 11);
    currentUser.password = hash;
  }
  next();
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject(); //always convert to object to delete.

  delete userObject.password;
  delete userObject.__v;
  // delete userObject._id;

  return userObject;
};

userSchema.static("checkCredentials", async function (email, plainPW) {
  const user = await this.findOne({ email });

  console.log("Check credentials: ", user);
  if (user) {
    const isMatch = await bcrypt.compare(plainPW, user.password);

    console.table({ isMatch });

    if (isMatch) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
});

export default model("user", userSchema);
